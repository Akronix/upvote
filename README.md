# UpVote
## What's this?
A Question&Answer collaborative site to make decisions using [SwellRT](http://swellrt.org/) technology.
Start asking a question, wait for answer and people will vote which is the rightest one.
Use it to decide what to do this weekend, where to go to eat tonight or the name of your next pet.
It's absolutely real time and can be installed in different networks thanks to SwellRT.
[!sample](assets/example/Screenshot.png)

## Installation
First, clone the repository
```bash
git clone https://github.com/Akronix/upvote && cd upvote
```
You'll need to have npm installed, [install it for your system](https://nodejs.org/en/) if you haven't yet.

Now, we'll need to install the dependencies. Do:
```bash
npm install
bower install
```

Finally, open the index.html file with your favourite browser.

## Start from a sample model
You can use upvote using your own instace of SwellRT.
However, I set up by default demo.swellrt.org instance just to make it easier for you to try it out.
For a quick look, you can use a sample model I made adding:
`localStorage.modelId = demo.swellrt.org/s+c19jnURRfQA`
to index.js:11

## Future works
* restrict number of ups to one per session
* managing users
