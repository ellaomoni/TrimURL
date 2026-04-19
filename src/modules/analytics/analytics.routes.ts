import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";
import { getAnalyticsForLink } from "./analytics.controller";

const router = Router();

/**
 * @openapi
 * /analytics/{linkId}:
 *   get:
 *     summary: Get analytics for a specific short link
 *     description: Returns analytics data for a link owned by the authenticated user.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: linkId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the short link
 *         example: clx123abc456def789
 *     responses:
 *       200:
 *         description: Link analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Link analytics fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     link:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: clx123abc456def789
 *                         longUrl:
 *                           type: string
 *                           format: uri
 *                           example: https://example.com/my-very-long-url
 *                         shortCode:
 *                           type: string
 *                           example: abc123
 *                         customAlias:
 *                           type: string
 *                           nullable: true
 *                           example: my-link
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: 2026-04-19T10:30:00.000Z
 *                     totalClicks:
 *                       type: integer
 *                       example: 42
 *                     recentClicks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: clk_001
 *                           ipAddress:
 *                             type: string
 *                             nullable: true
 *                             example: 192.168.1.1
 *                           userAgent:
 *                             type: string
 *                             nullable: true
 *                             example: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
 *                           referrer:
 *                             type: string
 *                             nullable: true
 *                             example: https://google.com
 *                           clickedAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-04-19T11:00:00.000Z
 *                     clicksOverTime:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             example: 2026-04-19
 *                           count:
 *                             type: integer
 *                             example: 12
 *       400:
 *         description: Invalid link ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid link ID
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Link not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Link not found
 */

router.get("/:linkId", authMiddleware, getAnalyticsForLink);

export default router;