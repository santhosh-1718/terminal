const terminalBody = document.getElementById('terminal-body');
const commandInput = document.getElementById('command-input');

// File system simulation
let currentDir = {
  name: '~',
  contents: {
    'file1.txt': 'This is the content of file1.txt',
    'file2.txt': 'This is the content of file2.txt',
    'folder1': {
      name: 'folder1',
      contents: {
        'file3.txt': 'This is the content of file3.txt',
      },
    },
  },
};

// Command handler
commandInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const command = commandInput.value.trim();
    commandInput.value = '';
    handleCommand(command);
  }
});

// Function to handle commands
function handleCommand(command) {
  const output = document.createElement('div');
  output.className = 'output';
  output.innerHTML = `<span class="prompt">user@ctf-tools:~$</span> ${command}`;
  terminalBody.appendChild(output);

  // Split command into parts
  const parts = command.split(' ');
  const cmd = parts[0];
  const args = parts.slice(1);

  // Process command
  let result = '';
  switch (cmd) {
    case 'help':
      result = `Available commands:
      - help: Show this help message
      - ls: List directory contents
      - cd <dir>: Change directory
      - cat <file>: Display file content
      - clear: Clear the terminal`;
      break;
    case 'ls':
      result = listContents(currentDir);
      break;
    case 'cd':
      result = changeDirectory(args[0]);
      break;
    case 'cat':
      result = displayFileContent(args[0]);
      break;
    case 'clear':
      terminalBody.innerHTML = '<div class="output">Welcome to CTF Tools Terminal. Type \'help\' for a list of commands.</div>';
      return;
    default:
      result = `Command not found: ${cmd}`;
  }

  const resultOutput = document.createElement('div');
  resultOutput.className = 'output';
  resultOutput.textContent = result;
  terminalBody.appendChild(resultOutput);

  // Scroll to bottom
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Function to list directory contents
function listContents(dir) {
  return Object.keys(dir.contents).join(' ');
}

// Function to change directory
function changeDirectory(dirName) {
  if (dirName === '..') {
    currentDir = { name: '~', contents: currentDir.contents }; // Go back to root
    return '';
  } else if (currentDir.contents[dirName] && typeof currentDir.contents[dirName] === 'object') {
    currentDir = currentDir.contents[dirName];
    return '';
  } else {
    return `Directory not found: ${dirName}`;
  }
}

// Function to display file content
function displayFileContent(fileName) {
  if (currentDir.contents[fileName] && typeof currentDir.contents[fileName] === 'string') {
    return currentDir.contents[fileName];
  } else {
    return `File not found: ${fileName}`;
  }
}
