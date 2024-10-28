import express, { Request as ExpressRequest, Response } from 'express';
const router = express.Router();

router.get('/content', async (req: ExpressRequest, res: Response) => {
  try {
    const path = require('path');
    const fs = require('fs');
    const directoryPath = path.join(
      __dirname,
      '../../todo-list/src/assets/svg_list_icons'
    );

    fs.readdir(directoryPath, function (err: string, files: any[]) {
      if (err) {
        return res.status(500).json({ error: 'Unable to scan directory' });
      }

      let svgPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const filePath = path.join(directoryPath, file);
          fs.readFile(filePath, 'utf8', (err: any, data: any) => {
            if (err) reject(err);
            else resolve({ filename: file, content: data });
          });
        });
      });

      Promise.all(svgPromises)
        .then((svgFiles) => {
          res.status(201).json({ data: svgFiles });
        })
        .catch((error) => res.status(500).json({ error }));
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
export { router };
