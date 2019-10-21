from os import walk, path
from imageio import imread
import math

def load_images(n = math.inf, rootdir = 'data/'):
  '''
    Loads `n` or all image files from the given rootdir and subdirectories.
    It returns a tuple with the images filenames (first entry) and the images
    themselves (as np.ndarrays). 
  '''
  images = []
  files = []
  for (dir, _, filenames) in walk(rootdir):
    for i, filename in enumerate(filenames):
      if i == n:
        break
      images.append(imread(path.join(dir, filename)))
      files.append(filename)

  return (files, images)
