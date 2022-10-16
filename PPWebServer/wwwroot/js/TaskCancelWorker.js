Loop();

function Loop() {
    do {
        Task();
    }
    while (true)
}

function Task() {
    setTimeout(function () {
        self.postMessage("Working...")
    }, 1000);
}