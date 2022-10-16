function PrintPrimesParallel(first, last) {
	var m_startTime = performance.now();
	var chunkedIntervals = ChunkIntervals(first, last);
	console.log('chunked into ' + navigator.hardwareConcurrency + ' chunks: ', chunkedIntervals);
	var parallelPrimes = new Parallel(chunkedIntervals);

	parallelPrimes.require(GetPrimes);
	parallelPrimes.map(function (interval) {
		return GetPrimes(interval[0], interval[1]);
	}).reduce(function (data) {
		return [...data[0], ...data[1]];
	}).then(function (data) {
		console.log(data.sort(function (a, b) { return a - b }));
		console.log('elapsed time (parallel): ' + GetElapsedTime(m_startTime));
	});
}

function PrintPrimesSequential(first, last) {
	var m_startTime = performance.now();
	var data = GetPrimes(first, last).sort(function (a, b) { return a - b })
	console.log('primes: ', data);
	console.log('elapsed time (sequential): ' + GetElapsedTime(m_startTime));
	
}


/**
 * In JS There doesn't seem to be an equivalent of .NET's "Partitioner.Create(first, last), range" method
 * so this function "chunks the user specified range", based on available CPU cores. (using navigator.hardwareConcurrency)
 * @param {int} min
 * @param {int} max
 * @returns Array - array of chunked intervals
 */
function ChunkIntervals(min, max) {
    const c = Math.floor(max / navigator.hardwareConcurrency);
    const r = [];
    for (var i = min; i <= max; i += c) {
        const a = i == 0 ? i : i += 1;
        const b = i + c > max ? max : i + c;
        if (a < max) r.push([a, b])
    }
    return r;
}



function GetPrimes(first, last) {
	var primes = [];
	var n = first <= 1 ? 2: first;
	while (n < last) {
		var k = Math.sqrt(n);
		var found = false;

		for (var i = 2; !found && i <= k; ++i) {
			found = n % i === 0;
		}

		if (!found) {
			primes.push(n);
		}
		n++;
	}
	return primes;
}

function GetElapsedTime(startTime, decimals = 5) {
	const elapsedTime = (performance.now() - startTime) / 1000;
	return elapsedTime.toFixed(decimals);
}

//PrintPrimesParallel(0, 10000000);

// PrintPrimesSequential(0, 10000000)