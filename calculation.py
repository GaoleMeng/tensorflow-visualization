from tensorflow.examples.tutorials.mnist import input_data

mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

import tensorflow as tf;

x = tf.placeholder(tf.float32, [None, 784]);
ydata = tf.placeholder(tf.float32, [None, 10]);

W = tf.Variable(tf.random_uniform([784, 10]));
b = tf.Variable(tf.zeros([10]));

y = tf.nn.softmax(tf.matmul(x, W) + b);
cross_entropy = tf.reduce_mean(-tf.reduce_sum(ydata * tf.log(y), reduction_indices=[1]))

optimizer = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)


sess = tf.InteractiveSession()
tf.global_variables_initializer().run()


for _ in range(1000):
  batch_xs, batch_ys = mnist.train.next_batch(100)
  sess.run(optimizer, feed_dict={x: batch_xs, ydata: batch_ys});


correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(ydata,1))

accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

print(sess.run(accuracy, feed_dict={x: mnist.test.images, ydata: mnist.test.labels}))

