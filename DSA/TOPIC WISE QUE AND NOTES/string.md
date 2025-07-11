class Solution {
public:
    string capitalizeTitle(string title) {
       int i=0;
       while(i<title.length()){
        
        while(i<title.length() && title[i]==' '){i++;}
        int st=i;
        while(i<title.length() && title[i]!=' '){i++;}
        int end=i;
        int len=end-st;
        if(len>=3){
            if(title[st]>='a' && title[st]<='z'){title[st]=title[st]-'a'+'A';}
           
            for(int i=st+1;i<end;i++){
                if(title[i]>='A'&& title[i]<='Z'){title[i]=title[i]-'A'+'a';}
                else{continue;}
            }
        }
        else{
           for(int i=st;i<end;i++){
                if(title[i]>='A'&& title[i]<='Z'){title[i]=title[i]-'A'+'a';}
                else{continue;}
            }  
        }
        i++;
      }
    return title;
    }
    
};
### 🔍 In C++, the `continue` statement is used **inside loops** like `for`, `while`, or `do-while`.

It **skips the rest of the current iteration** and **jumps to the next iteration** of the loop.

---

### 📌 Meaning of `continue` in your code:

Let's look at this part:

```cpp
for(int i = st+1; i < end; i++) {
    if(title[i] >= 'A' && title[i] <= 'Z') {
        title[i] = title[i] - 'A' + 'a'; // convert to lowercase
    } else {
        continue;
    }
}
```

### 🔹 Explanation:

* If the current character is **uppercase**, you convert it to **lowercase**.
* If it's **already lowercase**, the `else` block says: `continue;`
* That means: "**Skip remaining code in the loop and go to the next character**".

---

### ✅ But here’s the thing:

> The `continue;` is **not needed** in your case — it’s **redundant**.

Why?

Because there is **no code** after the `else` block inside the loop.
So it would automatically go to the next iteration anyway.

---

### ✂️ Simplified version (without `continue`):

```cpp
for(int i = st+1; i < end; i++) {
    if(title[i] >= 'A' && title[i] <= 'Z') {
        title[i] = title[i] - 'A' + 'a';
    }
    // No need for 'else' or 'continue'
}
```

---

### ✅ Summary:

| Keyword      | Meaning                                         |
| ------------ | ----------------------------------------------- |
| `continue;`  | Skip rest of loop body & jump to next iteration |
| In your code | It does nothing extra; can be safely removed    |

---

Let me know if you'd like:

* ✍️ Handwritten-style diagram showing loop flow with `continue`
* 🧪 Dry run of this loop on a sample word like `"cAPs"`



#include <iostream>
#include <string>
using namespace std;

void printNthWord(string title, int n) {
    int i = 0;
    int wordCount = 0;

    while (i < title.length()) {
        // Skip spaces
        while (i < title.length() && title[i] == ' ') i++;

        int st = i;

        // Go to end of the word
        while (i < title.length() && title[i] != ' ') i++;

        int end = i;

        wordCount++;

        if (wordCount == n) {
            cout << "Word " << n << ": " << title.substr(st, end - st) << endl;
            return;
        }

        i++; // Move to next character
    }

    cout << "Word " << n << " not found!" << endl;
}

int main() {
    string title = "cAPiTal tHE TitLE";
    int n = 3;

    printNthWord(title, n);
    return 0;
}
string getNthWord(string title, int n) {
    int i = 0, wordCount = 0;

    while (i < title.length()) {
        // Skip spaces
        while (i < title.length() && title[i] == ' ') i++;

        int st = i;

        // Move to end of word
        while (i < title.length() && title[i] != ' ') i++;

        int end = i;
        wordCount++;

        if (wordCount == n) {
            string result = "";
            for (int j = st; j < end; j++) {
                result += title[j];  // Append each character
            }
            return result;
        }

        i++;  // Move to next word
    }

    return ""; // Not found
}


#include <iostream>
#include <string>
using namespace std;

string getSecondLastWord(string title) {
    int i = 0;
    string prev = "", curr = "";

    while (i < title.length()) {
        // Skip spaces
        while (i < title.length() && title[i] == ' ') i++;

        int st = i;

        // Move to end of the word
        while (i < title.length() && title[i] != ' ') i++;
        int end = i;

        if (st < end) {
            // Build current word manually
            prev = curr; // update second last
            curr = "";
            for (int j = st; j < end; j++) {
                curr += title[j];
            }
        }

        i++;
    }

    return prev;
}

int main() {
    string title = "  hello  world example ";
    cout << "Second last word: " << getSecondLastWord(title) << endl;
    return 0;
}
