import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/appErrors";

type TrackClickInput = {
  shortLinkId: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  referrer?: string | null;
};

export const trackClickEvent = async (payload: TrackClickInput) => {
  const { shortLinkId, ipAddress, userAgent, referrer } = payload;

  const clickEvent = await prisma.clickEvent.create({
    data: {
      shortLinkId,
      ipAddress: ipAddress || null,
      userAgent: userAgent || null,
      referrer: referrer || null,
    },
  });

  return clickEvent;
};

export const getLinkAnalytics = async (userId: string, linkId: string) => {
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
      createdAt: true,
    },
  });

  if (!link) {
    throw new AppError("Link not found", 404);
  }

  const totalClicks = await prisma.clickEvent.count({
    where: {
      shortLinkId: linkId,
    },
  });

  const recentClicks = await prisma.clickEvent.findMany({
    where: {
      shortLinkId: linkId,
    },
    orderBy: {
      clickedAt: "desc",
    },
    take: 10,
    select: {
      id: true,
      ipAddress: true,
      userAgent: true,
      referrer: true,
      clickedAt: true,
    },
  });

  const clicksOverTimeRaw = await prisma.clickEvent.findMany({
    where: {
      shortLinkId: linkId,
    },
    orderBy: {
      clickedAt: "asc",
    },
    select: {
      clickedAt: true,
    },
  });

  const clicksOverTimeMap: Record<string, number> = {};

  for (const click of clicksOverTimeRaw) {
    const date = click.clickedAt.toISOString().split("T")[0];
    clicksOverTimeMap[date] = (clicksOverTimeMap[date] || 0) + 1;
  }

  const clicksOverTime = Object.entries(clicksOverTimeMap).map(
    ([date, count]) => ({
      date,
      count,
    })
  );

  return {
    link,
    totalClicks,
    recentClicks,
    clicksOverTime,
  };
};