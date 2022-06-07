{
  function formatNumber(n) {
    isNaN(n) ? '0' : console.log(Number(n).toFixed(2));
  }

  formatNumber('12.345') // 12.35
}
