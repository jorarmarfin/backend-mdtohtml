%{
#include <stdio.h>
%}

/* Define tokens for Markdown elements */
%%
^#[^#\n]*          { printf("<h1>%s</h1>\n", yytext + 2); }
^##[^#\n]*         { printf("<h2>%s</h2>\n", yytext + 3); }
^###[^#\n]*         { printf("<h3>%s</h3>\n", yytext + 4); }

^\*[^\n]*          { printf("<ul><li>%s</li></ul>\n", yytext + 2); }
^-[^\n]*          { printf("<ul><li>%s</li></ul>\n", yytext + 2); }
^\+[^\n]*          { printf("<ul><li>%s</li></ul>\n", yytext + 2); }

^```[^\n]*         { printf("<pre><code>%s</code></pre>\n", yytext + 3); }

\[[^\]]+\]\([^\)]+\) { 
  char text[1024], url[1024];
  sscanf(yytext, "[%[^]]](%[^)])", text, url);
  printf("<a href=\"%s\" class=\"custom-link\">%s</a>", url, text); 
}

!\[[^\]]+\]\([^\)]+\) { 
  char alt[1024], src[1024];
  sscanf(yytext, "![%[^]]](%[^)])", alt, src);
  printf("<img src=\"%s\" alt=\"%s\" class=\"custom-img\" />", src, alt); 
}

\n                 { /* Ignorar líneas vacías */ }

%%

int main(int argc, char **argv) {
    yylex();
    return 0;
}

int yywrap() {
    return 1;
}
