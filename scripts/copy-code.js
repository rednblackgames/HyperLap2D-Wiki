var codeBlocks = document.querySelectorAll('pre.highlight');

codeBlocks.forEach(function (codeBlock) {
  var copyButton = document.createElement('button');
  copyButton.className = 'copy';
  copyButton.type = 'button';
  copyButton.ariaLabel = 'Copy code to clipboard';
  copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';

  codeBlock.append(copyButton);

  copyButton.addEventListener('click', function () {
    var code = codeBlock.querySelector('code').innerText.trim();
    window.navigator.clipboard.writeText(code);

    copyButton.innerHTML = 'Copied';
    var fourSeconds = 2000;

    setTimeout(function () {
      copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
    }, fourSeconds);
  });
});