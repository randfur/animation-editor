export function getDirectoryAccess() {
  const button = document.createElement('button');
  button.textContent = 'Open directory';
  document.body.appendChild(button);
  return new Promise(resolve => {
    button.addEventListener('click', async () => {
      resolve(await showDirectoryPicker({mode: 'readwrite'}));
      button.remove();
    });
  });
}