from PIL import Image
import sys

def remove_white_bg(image_path, output_path, tolerance=240):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # check if pixel is near white
            if item[0] >= tolerance and item[1] >= tolerance and item[2] >= tolerance:
                # change to transparent
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {image_path} and saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python remove_bg.py <input> <output>")
    else:
        remove_white_bg(sys.argv[1], sys.argv[2])
