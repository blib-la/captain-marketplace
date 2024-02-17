import fsp from "node:fs/promises";
import path from "node:path";
import console from "node:console";

import fse from "fs-extra";
import JSON5 from "json5";
import sharp from "sharp";

export async function createJsonStructure(basePath) {
	const topLevelStructure = {};
	console.log({ basePath });

	async function constructStructure(currentPath, object) {
		const items = await fsp.readdir(currentPath);

		for (const item of items) {
			const fullPath = path.join(currentPath, item);
			const stats = await fse.stat(fullPath);

			if (stats.isDirectory()) {
				const itemKey = item;
				object[item] = {};
				await constructStructure(fullPath, object[itemKey]);
			} else if (stats.isFile()) {
				const fileExtension = path.extname(fullPath).toLowerCase();
				if ([".json", ".json5"].includes(fileExtension)) {
					const fileContents = await fsp.readFile(fullPath, "utf8");
					const parsedJson = JSON5.parse(fileContents);
					const fileNameKey = path.basename(item, fileExtension);
					const dir = path.normalize(path.parse(fullPath).dir).replace(/\\/g, "/");
					const id = dir.split("/").slice(-2).join("/");
					console.log(id);
					object[fileNameKey] = parsedJson;
					object.id = id;
				} else if ([".jpg", ".jpeg", ".png"].includes(fileExtension)) {
					const imageBuffer = await fsp.readFile(fullPath);
					const resizedImageBuffer = await sharp(imageBuffer)
						.resize(256, 256)
						.jpeg({ quality: 60, progressive: true })
						.toBuffer();

					const base64Image = resizedImageBuffer.toString("base64");
					object.previews = object.previews ?? [];

					object.previews.push({
						type: "image",
						content: `data:image/jpeg;base64,${base64Image}`,
					});
				} else if ([".txt"].includes(fileExtension)) {
					const content = await fsp.readFile(fullPath, "utf8");
					object.previews = object.previews ?? [];
					object.previews.push({ type: "text", content: content.trim() });
				}
			}
		}
	}

	const topLevelDirectories = await fse.readdir(basePath);
	for (const directory of topLevelDirectories) {
		const fullPath = path.join(basePath, directory);
		const stat = await fse.stat(fullPath);
		if (stat.isDirectory()) {
			topLevelStructure[directory] = {};
			await constructStructure(fullPath, topLevelStructure[directory]);
		}
	}

	return topLevelStructure;
}

// Usage

const json = await createJsonStructure(path.join(process.cwd(), "files"));
await fsp.writeFile("index.json", JSON.stringify(json, null, 2));
