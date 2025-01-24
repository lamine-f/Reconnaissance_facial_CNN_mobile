import base64
import numpy as np

def decode_base64_image(encoded_image):
    decoded_data = base64.b64decode(encoded_image)
    return np.frombuffer(decoded_data, dtype=np.uint8)
