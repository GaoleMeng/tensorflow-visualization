import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

pca = PCA()
X = np.random.random((100,10)) # generate an N = 100, D = 10 random data matrix
Z = pca.fit_transform(X)
# visualize the covariance of Z
plt.imshow(np.cov(Z.T))
plt.show()

