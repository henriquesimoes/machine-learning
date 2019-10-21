import numpy as np
import matplotlib.pyplot as plt

from lib.kmeans import KMeans
from lib.loader import load_images

images = load_images(50)

k = 20

km = KMeans(k, images)
km.cluster(50)

clusters = km.get_clusters()

for i, cluster in enumerate(clusters):
  print('Cluster #{}'.format(i))
  for img in cluster:
    print(img)
  print()

n = int(input("Which cluster you'd like to see the images? "))
while n > 0 and n < k:
  for img in clusters[n]:
    plt.imshow(plt.imread('data/' + img))
    plt.show()
  n = int(input("Which other? "))
