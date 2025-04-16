/**
 * Simple iOS Picker JS Library, by Dinom
 * Version: v1.0
 * Official Repository: https://github.com/DinomNet/Simple-iOS-Picker.js/
 *
 * MIT License
 *
 * Copyright (c) 2025, github.com/Chefaroon
 *
 * Permission is hereby granted, free of charge, to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function(){
	// Inject minified styles directly
	const styleTag=document.createElement('style');
	const darkModeCSS=`/*iOS Picker Library Styles (Dark)*/
		.ios-picker-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);justify-content:center;align-items:flex-end;z-index:1000}
		.ios-picker-content{background:#1c1c1e;border:1px solid rgba(255,255,255,.1);border-top-left-radius:18px;border-top-right-radius:18px;width:100%;max-width:400px;transform:translateY(100%);transition:transform .25s cubic-bezier(.4,0,.2,1);will-change:transform;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
		.ios-picker-overlay.show .ios-picker-content{transform:translateY(0)}
		.ios-picker-options{max-height:45vh;overflow-y:auto;-webkit-overflow-scrolling:touch}
		.ios-picker-options div:first-child{border-radius:16px 16px 0 0;}
		.ios-picker-options div{padding:15px;font-size:18px;text-align:center;color:#fff;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.1);transition:background .1s}
		.ios-picker-options div:active,.ios-picker-cancel:active{background:rgba(255,255,255,.15)}
		.ios-picker-options div.selected{color:#fff;background:rgba(0,122,255,.3);font-weight:500}
		.ios-picker-cancel{font-weight:bold;padding:15px;font-size:18px;text-align:center;color:#ff453a;border-top:1px solid rgba(255,255,255,.1);background:black;cursor:pointer}
		@media (min-width:768px){.ios-picker-overlay{align-items:center}.ios-picker-content{border-radius:18px;width:90%;box-shadow:0 4px 20px rgba(0,0,0,.3)}}
	`;
	const lightModeCSS=`/*iOS Picker Library Styles (Light)*/
		.ios-picker-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);justify-content:center;align-items:flex-end;z-index:1000}
		.ios-picker-content{background:#f2f2f7;border:1px solid rgba(255,255,255,.2);border-top-left-radius:18px;border-top-right-radius:18px;width:100%;max-width:400px;transform:translateY(100%);transition:transform .25s cubic-bezier(.4,0,.2,1);will-change:transform;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
		.ios-picker-overlay.show .ios-picker-content{transform:translateY(0)}
		.ios-picker-options{max-height:45vh;overflow-y:auto;-webkit-overflow-scrolling:touch}
		.ios-picker-options div{padding:15px;font-size:18px;text-align:center;color:#000;cursor:pointer;border-bottom:1px solid rgba(0,0,0,.08);transition:background .1s}
		.ios-picker-options div:first-child{border-radius:16px 16px 0 0;}
		.ios-picker-options div:active,.ios-picker-cancel:active{background:rgba(0,0,0,.1)}
		.ios-picker-options div.selected{color:#007aff;background:rgba(0,122,255,.1);font-weight:500}
		.ios-picker-cancel{font-weight:bold;padding:15px;font-size:18px;text-align:center;color:#ff3b30;border-top:1px solid rgba(0,0,0,.1);background:transparent;cursor:pointer}
		@media (min-width:768px){.ios-picker-overlay{align-items:center}.ios-picker-content{border-radius:18px;width:90%;box-shadow:0 4px 20px rgba(0,0,0,.15)}}
	`;
	const scriptTag=document.currentScript||document.querySelector('script[src*="ios-picker"]');
	const scriptTheme=scriptTag&&scriptTag.dataset.theme;
	const useLightMode=scriptTheme?scriptTheme==='light':window.matchMedia('(prefers-color-scheme:light)').matches;
	styleTag.textContent=useLightMode?lightModeCSS:darkModeCSS;
	document.head.appendChild(styleTag);

	// Shared overlay and state
	let activeOverlay=null;
	let activeSelect=null;

	// Overlay template
	const overlayTemplate=document.createElement('div');
	overlayTemplate.className='ios-picker-overlay';
	const content=document.createElement('div');
	content.className='ios-picker-content';
	const optionsContainer=document.createElement('div');
	optionsContainer.className='ios-picker-options';
	const cancel=document.createElement('div');
	cancel.className='ios-picker-cancel';
	cancel.textContent='Cancel';
	content.appendChild(optionsContainer);
	content.appendChild(cancel);
	overlayTemplate.appendChild(content);

	// Show picker
	function showPicker(select){
		if(activeOverlay){return;}
		activeSelect=select;

		activeOverlay=overlayTemplate.cloneNode(true);
		const opts=activeOverlay.querySelector('.ios-picker-options');
		opts.innerHTML='';
		Array.from(select.options).forEach(option=>{
			const div=document.createElement('div');
			div.textContent=option.text;
			div.dataset.value=option.value;
			if(option.selected){div.classList.add('selected');}
			opts.appendChild(div);
		});

		// Event delegation on clone
		activeOverlay.querySelector('.ios-picker-options').addEventListener('click', (e)=>{
			const div=e.target.closest('.ios-picker-options div');
			if(!div){return;}
			opts.querySelectorAll('div').forEach(opt=>opt.classList.remove('selected'));
			div.classList.add('selected');
			select.value=div.dataset.value;
			select.dispatchEvent(new Event('change',{bubbles:true}));
			hidePicker();
		});

		activeOverlay.querySelector('.ios-picker-cancel').addEventListener('click', hidePicker);
		activeOverlay.addEventListener('click', (e)=>{
			if(e.target===activeOverlay){hidePicker();}
		});

		document.body.appendChild(activeOverlay);
		activeOverlay.style.display='flex';
		requestAnimationFrame(()=>activeOverlay.classList.add('show'));
	}

	// Hide and destroy picker
	function hidePicker(){
		if(!activeOverlay){return;}
		activeOverlay.classList.remove('show');
		setTimeout(()=>{
			activeOverlay.remove();
			activeOverlay=null;
			activeSelect=null;
		}, 250);
	}

	// Initialize picker
	function initPicker(select){
		if(select.dataset.pickerInitialized){return;}
		select.dataset.pickerInitialized='true';

		// Hijack click and mousedown
		select.addEventListener('mousedown', (e)=>{
			e.preventDefault();
			showPicker(select);
		});
		select.addEventListener('click', (e)=>{
			e.preventDefault();
		});

		// Observe select changes
		const observer=new MutationObserver(()=>{
			if(activeSelect===select&&activeOverlay){
				const opts=activeOverlay.querySelector('.ios-picker-options');
				const selectedValue=select.value;
				opts.innerHTML='';
				Array.from(select.options).forEach(option=>{
					const div=document.createElement('div');
					div.textContent=option.text;
					div.dataset.value=option.value;
					if(option.value===selectedValue){div.classList.add('selected');}
					opts.appendChild(div);
				});
			}
		});
		observer.observe(select, {childList:true,subtree:true});

		// Cleanup
		const cleanupObserver=new MutationObserver((mutations,obs)=>{
			if(!document.contains(select)){
				observer.disconnect();
				obs.disconnect();
			}
		});
		cleanupObserver.observe(document.body, {childList:true,subtree:true});
	}

	// Initialize existing pickers
	document.querySelectorAll('select.picker').forEach(initPicker);

	// Watch dynamic pickers
	let pendingPickers=new Set();
	const observer=new MutationObserver((mutations)=>{
		mutations.forEach(mutation=>{
			if(mutation.type!=='childList'){return;}
			mutation.addedNodes.forEach(node=>{
				if(node.nodeType!==1){return;}
				if(node.matches('select.picker')){pendingPickers.add(node);}
				node.querySelectorAll?.('select.picker').forEach(s=>pendingPickers.add(s));
			});
		});
		if(pendingPickers.size){
			requestAnimationFrame(()=>{
				pendingPickers.forEach(initPicker);
				pendingPickers.clear();
			});
		}
	});
	observer.observe(document.body, {childList:true,subtree:true});
})();