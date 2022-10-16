const worker = new Worker(URL.createObjectURL(new Blob(["(" + Loop.toString() + ")()"], { type: 'text/javascript' })));
    //new Worker('TaskCancelWorker.js')

if (window != self) {
    worker.postMessage("Running Loop...")
    Loop();
}

document.getElementById("cancelTaskBtn").addEventListener("click", function () {
    worker.terminate()
});

worker.onmessage = function (event) {
    console.log("Data: " + event.data)
};

worker.onerror = function (event) {
    console.log(event.message, event);
};

function Loop() {
    do {
        setTimeout(function () {
            worker.postMessage("Working...")
        }, 1000);
    }
    while (true)
}
/*
function asyncThread(fn, ...args) {
    if (!window.Worker) {
        throw Promise.reject(new ReferenceError(`WebWorkers aren't available.`));
    }
    
    const fnWorker = `
  self.onmessage = function(message) {
    (${fn.toString()})
      .apply(null, message.data)
      .then(result => self.postMessage(result));
  }`;

    return new Promise((resolve, reject) => {
        try {
            const blob = new Blob([fnWorker], { type: 'text/javascript' });
            const blobUrl = window.URL.createObjectURL(blob);
            const worker = new Worker(blobUrl);
            window.URL.revokeObjectURL(blobUrl);

            worker.onmessage = result => {
                resolve(result.data);
                worker.terminate();
            };

            worker.onerror = error => {
                reject(error);
                worker.terminate();
            };

            worker.postMessage(args);
        } catch (error) {
            reject(error);
        }
    });
}
*/