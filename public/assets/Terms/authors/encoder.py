from pathlib import Path
import base64

def save(encoded_data, filename):
  imgdata = base64.b64decode(encoded_data)
  with open(filename, 'wb') as f:
      f.write(imgdata)

base64_code = 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVR4nHWOMQ7AIAwD/dO+2StLBzowdstGqoRQIpUigYXvFAAAta2kauGbs4cdIjJgDanSOxe8bAE3Cb/cUabsjaflR7A35xpCjOoXjwyXFZ/awiz9wQdVKI6QK6MvHQAAAABJRU5ErkJggg=='
save(base64_code, str(Path(__file__).parent/'avater_overlay.png'))