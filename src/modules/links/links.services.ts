import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/appErrors";
import { generateShortCode } from "../../utils/generateShortcodes";
import { env } from "../../config/env";

type CreateLinkInput = {
  longUrl: string;
  customAlias?: string;
  expiresAt?: string;
};

const generateUniqueShortCode = async (): Promise<string> => {
  let shortCode = generateShortCode(6);
  let existingLink = await prisma.shortLink.findUnique({
    where: { shortCode },
  });

  while (existingLink) {
    shortCode = generateShortCode(6);
    existingLink = await prisma.shortLink.findUnique({
      where: { shortCode },
    });
  }

  return shortCode;
};

const formatShortLinkResponse = (link: {
  id: string;
  longUrl: string;
  shortCode: string;
  customAlias: string | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) => {
  return {
    ...link,
    shortUrl: `${env.APP_BASE_URL}/links/r/${link.shortCode}`,
  };
};

export const createShortLink = async (
  userId: string,
  payload: CreateLinkInput
) => {
  const { longUrl, customAlias, expiresAt } = payload;

  if (customAlias) {
    const existingAlias = await prisma.shortLink.findFirst({
      where: {
        OR: [{ customAlias }, { shortCode: customAlias }],
      },
    });

    if (existingAlias) {
      throw new AppError("Custom alias is already in use", 409);
    }
  }

  const shortCode = customAlias || (await generateUniqueShortCode());

  const createdLink = await prisma.shortLink.create({
    data: {
      longUrl,
      shortCode,
      customAlias: customAlias || null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      userId,
    },
    select: {
      id: true,
      longUrl: true,
      shortCode: true,
      customAlias: true,
      expiresAt: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
  });

  if (expiresAt && new Date(expiresAt) <= new Date()) {
  throw new AppError("Expiry date must be in the future", 400);
}

  return formatShortLinkResponse(createdLink);
};

export const getUserLinks = async (
  userId: string,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const [links, total] = await Promise.all([
    prisma.shortLink.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
      select: {
        id: true,
        longUrl: true,
        shortCode: true,
        customAlias: true,
        expiresAt: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.shortLink.count({
      where: { userId },
    }),
  ]);

  return {
    items: links.map(formatShortLinkResponse),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getSingleUserLink = async (userId: string, linkId: string) => {
  const link = await prisma.shortLink.findFirst({
    where: {
      id: linkId,
      userId,
    },
    select: {
      id: true,
      longUrl: true,
      shortCode: true,
      customAlias: true,
      expiresAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!link) {
    throw new AppError("Link not found", 404);
  }

 return formatShortLinkResponse(link);
};

export const deleteUserLink = async (userId: string, linkId: string) => {
  const existingLink = await prisma.shortLink.findFirst({
    where: {
      id: linkId,
      userId,
    },
  });

  if (!existingLink) {
    throw new AppError("Link not found", 404);
  }

  await prisma.shortLink.delete({
    where: {
      id: linkId,
    },
  });

  return {
    id: existingLink.id,
    message: "Link deleted successfully",
  };
};

//Redirect function to handles the redirection logic to the original URL when a short URL is accessed.
export const getLinkByShortCode = async (shortCode: string) => {
  const link = await prisma.shortLink.findFirst({
    where: {
      OR: [
        { shortCode },
        { customAlias: shortCode },
      ],
    },
  });

  if (!link) {
    throw new AppError("Short link not found", 404);
  }

  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    throw new AppError("This short link has expired", 410);
  }

  return link;
};