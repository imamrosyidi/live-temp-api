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
 *     description: Retrieves temperature records for the past 1 to 60 munites. Defaults to 5 munites if not specified.
 *     tags:
 *       - Temperature
 *     parameters:
 *       - in: query
 *         name: munites
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 60
 *           default: 5
 *         required: false
 *         description: Number of past munites to retrieve temperatures for (1–60 munites).
 *     responses:
 *       200:
 *         description: A list of temperature records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Temperature'
 *       400:
 *         description: Invalid hours parameter
 *       500:
 *         description: Internal server error
 */
