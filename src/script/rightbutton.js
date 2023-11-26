// クリックで処理開始
document.getElementById('flObgToggle').addEventListener('click', () => {
    // 親要素のトグルを操作
    const flWrapper = document.getElementById('floatingMenu');
    flWrapper.classList.toggle('notshow');
  });