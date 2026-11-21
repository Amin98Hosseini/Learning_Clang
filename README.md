# Learning C

A small, hands-on collection of C programs written while learning the language. Each lesson lives in its own numbered folder and focuses on a single concept, starting from printing text to reading user input and doing basic arithmetic.

## Table of Contents

- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Building the Programs](#building-the-programs)
  - [With GCC from the terminal](#with-gcc-from-the-terminal)
  - [With Visual Studio Code](#with-visual-studio-code)
- [Running the Programs](#running-the-programs)
- [Lessons](#lessons)
  - [1. Hello World](#1-hello-world)
  - [2. Strings and Escape Sequences](#2-strings-and-escape-sequences)
  - [3. Getting Input from the User](#3-getting-input-from-the-user)
  - [4. Simple Adder with `scanf`](#4-simple-adder-with-scanf)
- [What Each Lesson Teaches](#what-each-lesson-teaches)
- [Notes](#notes)
- [License](#license)

## Requirements

- A C compiler. The included VS Code tasks are configured for **GCC** from **MinGW-w64**, installed at `C:\mingw64\bin\gcc.exe` (Windows). Any other GCC/Clang installation works too, you only need to adjust the command path.
- Optional: [Visual Studio Code](https://code.visualstudio.com/) with the [C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) to build and debug with the provided tasks.

Check that your compiler is available:

```bash
gcc --version
```

## Project Structure

```text
Learning_Clang/
├── .vscode/
│   └── tasks.json              # Default build task (gcc, active file)
├── 1-HelloWorld/
│   ├── helloworld.c            # Print "Hello World!"
│   ├── helloworld.exe          # Pre-built Windows binary
│   └── .vscode/
│       ├── launch.json         # gdb debug configuration
│       └── tasks.json          # Build task for this folder
├── 2-StringInPrint/
│   ├── main.c                  # printf, tabs, newlines, quotes, alert
│   └── main.exe
├── 3-GetInputUser/
│   ├── main.c                  # Read an integer with scanf
│   └── main.exe
├── 4-SimppleAdder_Scanf/
│   ├── main.c                  # Add two integers entered by the user
│   └── main.exe
├── LICENSE                     # GNU GPL v3.0
└── README.md
```

## Building the Programs

### With GCC from the terminal

From the repository root, compile any lesson by pointing GCC at its source file. Replace the folder name with the lesson you want:

```bash
gcc 1-HelloWorld/helloworld.c -o 1-HelloWorld/helloworld
```

On Windows (Git Bash / MinGW) the output usually ends in `.exe`:

```bash
gcc 1-HelloWorld/helloworld.c -o 1-HelloWorld/helloworld.exe
```

Add debugging symbols with `-g` and compiler warnings with `-Wall`:

```bash
gcc -g -Wall 4-SimppleAdder_Scanf/main.c -o adder
```

### With Visual Studio Code

This repository ships a build task.

1. Open the project folder in VS Code.
2. Open the `.c` file you want to compile.
3. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> to run the default build task
   *(**C/C++: gcc.exe build active file**)*.
4. The binary is written next to the source file, using the same name as the source.

In `1-HelloWorld`, the **C/C++: gcc.exe build and debug active file** launch configuration can be used from the Run and Debug panel (<kbd>F5</kbd>) to build with `gcc` and step through the program with `gdb`.

If your compiler is not at `C:\mingw64\bin\gcc.exe`, update the `command` field in [.vscode/tasks.json](.vscode/tasks.json) (and `miDebuggerPath` in [1-HelloWorld/.vscode/launch.json](1-HelloWorld/.vscode/launch.json) for debugging).

## Running the Programs

Run the compiled binary directly:

```bash
./1-HelloWorld/helloworld.exe
```

```text
Hello World!
```

```bash
./2-StringInPrint/main.exe
```

```text
A       B       C
Apple   Orange  Bennana
Cow     Sheep   Lion
Hello "world" !
```

> The third line also emits a terminal bell (`\a`), which may produce a system beep depending on your terminal settings.

```bash
./3-GetInputUser/main.exe
```

```text
Please an entern integer number : 42

User enter This  number : 42
```

```bash
./4-SimppleAdder_Scanf/main.exe
```

```text
Please  enter first integer number : 7

Please  enter seconde integer number : 35
Result for : 7 + 35 = 42
```

> The program prints a newline after the first number only, so the result line can appear directly after the second prompt in some terminals (for example when input is piped).

## Lessons

### 1. Hello World

[`1-HelloWorld/helloworld.c`](1-HelloWorld/helloworld.c) — the smallest complete C program: includes `stdio.h`, defines `main`, calls `printf`, and returns `0`.

```c
#include "stdio.h"

int main()
{
    printf("Hello World!\r\n");
    return 0;
}
```

### 2. Strings and Escape Sequences

[`2-StringInPrint/main.c`](2-StringInPrint/main.c) — printing formatted text with escape sequences:

| Sequence | Meaning                     |
| -------- | --------------------------- |
| `\n`     | New line                    |
| `\t`     | Horizontal tab              |
| `\a`     | Alert / terminal bell       |
| `\"`     | Double quote inside a string |

```c
printf("A\tB\tC\t\n");
printf("Apple\tOrange\tBennana\t\n");
printf("Cow\tSheep\tLion\t\a\n");
printf("Hello \"world\" !\n");
```

### 3. Getting Input from the User

[`3-GetInputUser/main.c`](3-GetInputUser/main.c) — reads an integer with `scanf` and prints it back. The first argument of `scanf` is the format specifier (`%d` for an `int`); the remaining arguments are the addresses of the variables that receive the values, hence the `&`.

```c
int n;
printf("Please an entern integer number : ");
scanf("%d", &n);
printf("User enter This  number : %d \n", n);
```

### 4. Simple Adder with `scanf`

[`4-SimppleAdder_Scanf/main.c`](4-SimppleAdder_Scanf/main.c) — reads two integers, adds them, and prints the full equation. It also demonstrates declaring several variables of the same type in one statement.

```c
int a, b, c;

scanf("%d", &a);
scanf("%d", &b);

c = a + b;

printf("Result for : %d + %d = %d \n", a, b, c);
```

## What Each Lesson Teaches

| Folder                  | Concepts                                                    |
| ----------------------- | ----------------------------------------------------------- |
| `1-HelloWorld`          | Program structure, `main`, `#include`, `printf`, exit codes  |
| `2-StringInPrint`       | String literals, escape sequences, formatting with tabs      |
| `3-GetInputUser`        | Variables, `scanf`, format specifiers, pointers with `&`     |
| `4-SimppleAdder_Scanf`  | Multiple variables, arithmetic, combining input and output   |

## Notes

- Source files use `#include "stdio.h"`. The standard header is normally written with angle brackets — `#include <stdio.h>` — which tells the preprocessor to search the system include paths. Both forms compile with GCC here, but the angle-bracket form is the portable convention.
- The `.exe` files in this repository are pre-built Windows binaries from MinGW. They are not needed to build the sources and can be regenerated or ignored on other platforms.
- Source files use CRLF line endings, consistent with editing on Windows.
- Folder name `4-SimppleAdder_Scanf` keeps its original spelling so existing paths and build commands keep working.

## License

This project is licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE) for the full text.
