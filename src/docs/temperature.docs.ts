/**
 * @swagger
 * components:
 *   schemas:
 *     Temperature:
 *       type: object
 *       properties:
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the temperature recording in UTC.
 *         value:
 *           type: number
 *           description: The temperature value.
 */

/**
 * @swagger
 * /api/temperatures:
 *   get:
 *     summary: Retrieve a list of temperature records
 *     responses:
 *       200:
 *         description: A list of temperatures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Temperature'
 */
