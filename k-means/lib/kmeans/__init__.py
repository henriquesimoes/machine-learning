import numpy as np

class KMeans:
  '''This class deals with the k-means clustering'''
  def __init__(self, k, images):
    self.k = k
    self.images = images[0]
    self.raw = images[1]
    self.clusters = []
    self.img_means = []
    self.means = np.zeros(shape=(k))

    for image in self.raw:
      self.img_means.append(image.mean())


  def cluster(self, iterations = 100):
    temp = self.img_means.copy()
    
    np.random.shuffle(temp)

    self.means = np.array(temp[:self.k])

    prev = self.means.copy()
    self.step()
    iterations -= 1

    while (prev - self.means).sum() != 0 and iterations > 0:
      prev = self.means.copy()
      self.step()
      iterations -= 1

  def update_means(self):
    for i in range(len(self.clusters)):
      self.means[i] = 0

      for id in self.clusters[i]:
        self.means[i] += self.img_means[id]

      self.means[i] /= len(self.clusters[i])

  def step(self):
    self.clusters = [[] for _ in range(self.k)]

    for i in range(len(self.images)):
      current_mean = self.img_means[i]
      delta = np.Infinity
      best_cluster = 0

      for j, cluster_mean in enumerate(self.means):
        if abs(current_mean - cluster_mean) < delta:
          delta = abs(current_mean - cluster_mean)
          best_cluster = j
      self.clusters[best_cluster].append(i)

    self.update_means()

  def get_clusters(self):
    result = []

    for cluster in self.clusters:
      imgs = []
      for img_id in cluster:
        imgs.append(self.images[img_id])
      result.append(imgs)

    return result
