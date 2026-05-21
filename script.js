// ── Starfield ──
var C = document.getElementById('stars');
var ctx = C.getContext('2d');
var W, H, stars = [];
function resize() {
  W = C.width = window.innerWidth;
  H = C.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
for (var i=0; i<220; i++) {
  stars.push({
    x: Math.random()*2000, y: Math.random()*1200,
    r: Math.random()*1.4+0.2,
    a: Math.random(),
    sp: 0.003+Math.random()*0.008,
    px: (Math.random()-0.5)*0.15
  });
}
function drawStars() {
  ctx.clearRect(0,0,W,H);
  stars.forEach(function(s) {
    s.a += s.sp;
    s.x += s.px;
    if (s.x < 0) s.x = W;
    if (s.x > W) s.x = 0;
    var alpha = 0.4 + 0.6*Math.abs(Math.sin(s.a));
    ctx.beginPath();
    ctx.arc(s.x % W, s.y % H, s.r, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255,248,220,'+alpha.toFixed(2)+')';
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ── Sparks ──
function makeSpark() {
  var el = document.createElement('div');
  el.className = 'spark';
  el.style.left = (10+Math.random()*80)+'vw';
  el.style.bottom = (Math.random()*30)+'vh';
  el.style.animationDuration = (3+Math.random()*4).toFixed(1)+'s';
  el.style.animationDelay = (Math.random()*2).toFixed(1)+'s';
  el.style.width = el.style.height = (2+Math.random()*3).toFixed(1)+'px';
  el.style.background = Math.random()>.5 ? '#f5c842' : '#ff8c69';
  document.body.appendChild(el);
  setTimeout(function(){ el.remove(); }, 8000);
}
setInterval(makeSpark, 400);

// ── Navigation ──
function go(n) {
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  document.getElementById('p'+n).classList.add('active');
  if (n===2) startTypewriter();
  if (n===3) setTimeout(function(){ document.getElementById('css-rose').style.display='block'; }, 200);
  if (n===8) setTimeout(animateILY, 400);
}

// ── I Love You page 8 animation ──
function animateILY() {
  var delays = [200, 700, 1200, 1800];
  var ids = ['ilyI','ilyHeart','ilyLove','ilyYou'];
  ids.forEach(function(id, i){
    setTimeout(function(){
      document.getElementById(id).classList.add('show');
    }, delays[i]);
  });
  setTimeout(function(){ document.getElementById('ilyName').classList.add('show'); }, 2600);
  setTimeout(function(){ document.getElementById('foreverLine').classList.add('show'); }, 3400);
  // extra confetti hearts on this page
  var hearts = ['💖','🩷','💕','✨','🌹','💞','🌸'];
  for (var i=0; i<30; i++){
    (function(i){
      setTimeout(function(){
        var el = document.createElement('div');
        el.className = 'conf';
        el.textContent = hearts[Math.floor(Math.random()*hearts.length)];
        el.style.left = (Math.random()*100)+'vw';
        el.style.top = '-40px';
        var d = (3+Math.random()*4).toFixed(2)+'s';
        el.style.animationDuration = d;
        el.style.fontSize = (0.8+Math.random()*0.9).toFixed(2)+'rem';
        document.body.appendChild(el);
        setTimeout(function(){ el.remove(); }, parseFloat(d)*1000+300);
      }, i*150 + 500);
    })(i);
  }
}

// ── Typewriter ──
var lines = [
  "Dear Shivani,",
  "You walked into my world quietly —",
  "and rearranged everything.",
  "I didn't know I was waiting for you.",
  "But here we are, under the same stars.",
  "And I wouldn't trade this for anything."
];
function startTypewriter() {
  var tw = document.getElementById('tw-text');
  var sub = document.getElementById('tw-sub');
  var btn = document.getElementById('p2-btn');
  var full = lines.join('\n');
  var i = 0;
  tw.innerHTML = '<span class="cursor"></span>';
  sub.textContent = '';
  btn.style.display = 'none';

  function type() {
    if (i < full.length) {
      var ch = full[i];
      var cursor = tw.querySelector('.cursor');
      if (ch === '\n') {
        cursor.before(document.createElement('br'));
      } else {
        var t = document.createTextNode(ch);
        cursor.before(t);
      }
      i++;
      setTimeout(type, ch==='\n' ? 320 : 55);
    } else {
      tw.querySelector('.cursor').style.display='none';
      sub.textContent = '— written just for you, Shivani 🌹';
      btn.style.display = 'inline-block';
    }
  }
  setTimeout(type, 500);
}

// ── Runaway No ──
var noCount = 0;
var noWords = ['Nooo…','Please 🥺','Shivani…','Fine… yes 😅'];
function flee() {
  noCount++;
  var btn = document.getElementById('no-btn');
  var scene = document.getElementById('scene');
  var sw = scene.offsetWidth, sh = scene.offsetHeight;
  var bw = btn.offsetWidth, bh = btn.offsetHeight;
  btn.style.position='absolute';
  btn.style.transition='left 0.2s, top 0.2s';
  btn.style.left = Math.min(Math.max(8, Math.random()*(sw-bw-8)), sw-bw-8)+'px';
  btn.style.top  = Math.min(Math.max(220, Math.random()*(sh-bh-8)), sh-bh-8)+'px';
  if (noCount < noWords.length) btn.textContent = noWords[noCount];
  if (noCount >= 4) sayYes();
}

// ── Yes! ──
function sayYes() {
  go(7);
  boom();
}

function boom() {
  var items = ['🌹','🌸','✨','💖','🎊','💕','⭐','🌺','💫'];
  for (var i=0; i<55; i++) {
    (function(i){
      setTimeout(function(){
        var el = document.createElement('div');
        el.className = 'conf';
        el.textContent = items[Math.floor(Math.random()*items.length)];
        el.style.left = (Math.random()*100)+'vw';
        el.style.top = '-40px';
        var d = (2+Math.random()*3).toFixed(2)+'s';
        el.style.animationDuration = d;
        el.style.fontSize = (0.9+Math.random()*1).toFixed(2)+'rem';
        document.body.appendChild(el);
        setTimeout(function(){ el.remove(); }, parseFloat(d)*1000+300);
      }, i*65);
    })(i);
  }
}
