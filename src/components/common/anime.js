/*
  window.scrollY : 브라우저의 스크롤된 거리값 구함
  window.scroll(x,y) : x,y축으로 강제 스크롤 이동

*/

const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click',e=>{   
  anime(window,{
    prop: 'scroll',
    value: 800,  
    duration: 500    
  });
})


function anime(selector, option){
  const startTime = performance.now();
  if(!option.duration) option.duration=500;

  let currentValue = null;

  //만약 속성명이 scroll이면 scrollY값을 구하고
  //그렇지 않으면 그냥 option.value값을 실수로 반환
  if(option.prop==='scroll') currentValue = selector.scrollY;
  else currentValue = parseFloat(getComputedStyle(selector)[option.prop]);
  

  
  let isString = typeof option.value;
  if(isString==='string'){
    const parentW = parseInt(getComputedStyle(selector.parentElement).width);
    const parentH = parseInt(getComputedStyle(selector.parentElement).height);
    const x = ['margin-left', 'margin-right', 'right', 'left', 'width'];
    const y = ['margin-top', 'margin-bottom', 'top','bottom', 'height'];

    for(let condition of x) if(option.prop === condition) currentValue = (currentValue/parentW)*100;     
    for(let condition of y) if(option.prop === condition) currentValue = (currentValue/parentH)*100;     
    
    option.value = parseFloat(option.value);
  }    


  if(currentValue === option.value) return;  
  requestAnimationFrame(run);  

  function run(time){
    let timelast = time-startTime;
    let progress = timelast/option.duration;
  
    if(progress<0) progress =0;
    if(progress<1){  
      requestAnimationFrame(run);      
    }else{
      if(option.callback) option.callback();
    }

    const result = currentValue+ ((option.value-currentValue)*progress);

    if(isString === 'string') selector.style[option.prop]=`${result}%`;  
    else if(option.prop === 'opacity') selector.style[option.prop] = result;  
    //만약 속성명이 scroll이면 scroll메서드로 스크롤 이동
    else if(option.prop === 'scroll') window.scroll(0, result);
    else selector.style[option.prop]=`${result}px`; 
  }
}





