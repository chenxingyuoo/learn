from multiprocessing import Pool
import os, time, random

def long_time_task(name):
    print('Run task %s (%s)...' % (name, os.getpid()))
    start = time.time()
    time.sleep(random.random() * 3)
    end = time.time()
    print('Task %s runs %0.2f seconds.' % (name, (end - start)))

if __name__=='__main__':
    print('Parent process %s.' % os.getpid())
    p = Pool(4)
    for i in range(5):
        p.apply_async(long_time_task, args=(i,))
    print('Waiting for all subprocesses done...')
    p.close()
    p.join()
    print('All subprocesses done.')


# Parent process 4968.
# Waiting for all subprocesses done...
# Run task 0 (4969)...
# Run task 1 (4971)...
# Run task 2 (4970)...
# Run task 3 (4972)...
# Task 2 runs 0.96 seconds.
# Run task 4 (4970)...
# Task 1 runs 1.79 seconds.
# Task 3 runs 2.43 seconds.
# Task 0 runs 2.67 seconds.
# Task 4 runs 1.82 seconds.
# All subprocesses done.