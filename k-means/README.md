# K-means Clustering

This example uses Python to process the images in order to create clusters. For doing so, it uses the [NumPy][1], [ImageIO][2] and [MatPlotLib][3] libraries to manipulate the read the image files to the memory, manipulate the images and to display them.

## What's the idea

The idea here is to try creating image clusters using the [K-means][5] method.

## How it works

For doing so, it first initializes all the clusters with a example. After that, follows to steps:

  1. it assigns every data point to a cluster whose mean is closer to the current point;
  1. all the clusters means are updated with the mean of the points that belong to that cluster;

Those two steps are repeted until it converges to a fixed clustering structure, i.e. until no point is changed from cluster.

As of now, it uses the image mean (mean of the pixels values) to perform the clustering.

## How to run it

Firstly, make sure you have all the packages installed in your computer. Follow the [README][4] file on the root dir.

Before executing the code, you've got to put the images you want to cluster in the `/k-means/data` subdirectory. Now, everything is set up. For running the code, type in the command line:
  ```sh
    python3 main.py
  ```

## Note

Even though it uses the k-means method, it hasn't been intended to work well for clustering images. It's been developed to check how such a technique would come across clustering images.

[1]: https://numpy.org/
[2]: https://imageio.github.io/
[3]: https://matplotlib.org/
[4]: ../
[5]: https://en.wikipedia.org/wiki/K-means_clustering
