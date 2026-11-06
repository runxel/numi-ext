// Commercial rounding ("round half away from zero")
// Usage: cround(1,2345; 2) -> 1,23
//        cround(1,2345)    -> 1,23 (digits default to 2)
//        cround(1,3512; 1) -> 1,4
//        cround(2,5; 0)    -> 3
//        cround(-2,5; 0)   -> -3

// Shifts the decimal point via exponent notation instead of multiplying,
// which avoids binary floating point errors (e.g. 1.005 * 100 = 100.49999...).
function shift(num, exp) {
	const [mantissa, e = "0"] = String(num).split("e");
	return Number(mantissa + "e" + (Number(e) + exp));
}

function commercialRound(num, digits) {
	if (!Number.isFinite(num)) {
		return num;
	}
	const sign = num < 0 ? -1 : 1;
	return sign * shift(Math.round(shift(Math.abs(num), digits)), -digits);
}

numi.addFunction({ "id": "cround", "phrases": "cround, commercialround" }, function (values) {
	if (values.length < 1) {
		return;
	}
	// Digits default to 2 (like money amounts) and must be a non-negative integer
	const digits = Math.max(0, Math.trunc(values[1]?.double ?? 2));
	return { "double": commercialRound(values[0].double, digits) };
});
