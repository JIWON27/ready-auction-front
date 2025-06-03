const updateTimeLeft = product => {
	const now = new Date();
	const start = new Date(product.startDate);
	const close = new Date(product.closeDate);

	if (now < start) {
		const diff = start - now;
		return `${formatHHMMSS(diff)} 후 시작`;
	} else if (now <= close) {
		const diff = close - now;
		return `${formatHHMMSS(diff)} 후 종료`;
	} else {
		return '경매가 종료되었습니다';
	}
};

const formatHHMMSS = diff => {
	const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
	const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
		2,
		'0',
	);
	const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
	return `${hours}시간 ${minutes}분 ${seconds}초`;
};

export default updateTimeLeft;
