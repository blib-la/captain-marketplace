# captain-marketplace

Welcome to the captain-marketplace guide! This is where you can add information about your model, making it available for download on Captain.

> Note: We don't accept models trained on NSFW content. For such models, please use a different index.

## Where to Place Your Files

We organize our models into two categories:

- `checkpoints`: Here, we store information of Stable Diffusion checkpoints.
- `loras`: Here, we store information of Stable Diffusion LoRAs.

Place your model's `info.json` or `info.json5` file in its designated folder, named after the model.

For instance:

- If your model is `stable-diffusion-xl-base-1-0`, the file goes in `checkpoints/stable-diffusion-xl-base-1-0/`.
- If it's a LoRAs model, place it in `loras/your-model-id/`.

## Creating Your Info File

### Step 1: File Creation

- Create an `info.json` or `info.json5` file. (JSON5 offers more flexibility, as it allows comments and additional syntax features.)
- In addition to the info file, include an image named `01.jpg` or `01.png` in the same folder. This image should be a straightforward example of what your model can do or its unique style. Ideally, the image should include metadata from automatic1111/stable-diffusion-webui or ComfyUI.
- Place both the info file and the image in the model's designated folder.

```
stable-diffusion/
├── checkpoints/
│   └── model-name/
│       ├── info.json
│       └── 01.jpg
└── loras/
    └── model-name/
        ├── info.json
        └── 01.jpg
```

### Step 2: File Contents

Your file should be structured like this:

```json5
{
  type: "trained or merged", // Indicate if the model is original or a combination of others.
  architecture: "e.g., sd-xl-1-0", // Describe the model's structure.
  title: "Model Title", // Name your model.
  author: "Author or Creator", // Identify the creator.
  link: "Link to the model repository", // Provide a link for more information.
  license: "Model License", // Outline the usage terms.
  files: [
    {
      filename: "model file name", // Name of the model file.
      variant: "fp16, fp32, or bf16" // File format.
    }
    // Include additional files as needed.
  ]
}
```
Ensure all the necessary details are included and formatted correctly.

### Step 3: Submitting Your File

To contribute to our open-source project:
- Fork our project (create your own copy).
- Add your `info.json` or `info.json5` file to the appropriate folder in your fork.
- Submit a pull request to merge your changes with the main project, explaining your contribution.

## Guidelines and Verification

- Check your file for accuracy using online validation tools.
- Follow the naming and folder organization rules outlined above.
- Ensure your file contains precise and relevant model information.
- For assistance or inquiries, contact [Project Maintainer's Contact Information].

By adhering to these instructions, you can easily contribute to captain-marketplace, making your model accessible to others in a user-friendly manner.