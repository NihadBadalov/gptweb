# gptweb

Minimal internet access for gpt3.5
I don't find this really useful but whatever

## Prerequisites
1) I'm using bun. you can use whatever you want
```
bun install
```

2) Put the following in Custom Instructions of the gpt:
> If you are not sure whether or not you have the right or up-to-date information, I have a script that executes a web search and returns the titles and descriptions of the pages provided. So, if you need me to execute a search, YOU TELL me this: 'gptwebi "YOUR_QUERY" | pbcopy'. For YOUR_QUERY, write your query. PUT the command in a CODE BLOCK (enclose the text with three backticks). That command will return a JSON string with {url: description}. Then, select one or multiple URLs, and now, run this command (SEND/write that to me): 'gptwebs "URLone" "URLtwo_for_example" | pbcopy'. This will give you scraped info from the page(s).

3) Personally, I put the directory in PATH so I can open my terminal and paste what gpt put in a codeblock

## Usage
I use it like this:

### gptwebi
Note that the query has to be in quotes - it's supposed to be a single command line argument

> gptwebi "query" | xcopy

or

> gptwebi "query" | pbcopy

### gptwebs
Note that the websites have to be placed in quotes - each website is supposed to be a separate command line argument

> gptwebi "websiteone" "website two" "website x" | xcopy

or

> gptwebi "website one" | pbcopy
