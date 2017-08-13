let a = document.querySelectorAll('ul li');

a.forEach((i, index) => {
	setTimeout(() => {
		i.classList.remove('hide');
	}, (index * 1) * 200);
});


class Buttons {
	constructor() {
		this.sideBar = document.querySelector('.side-menu');
		this.workSpace = document.querySelector('.work-block');
		this.button = this.workSpace.querySelector('.button');
		this.changeText = this.workSpace.querySelector('.changeText');
		this.changeBackground = this.workSpace.querySelector('.changeBackground');
		this.toggleIcon = this.workSpace.querySelector('.toggleIcon');
		this.changeColor = this.workSpace.querySelector('.changeColor');
		this.editButton = document.querySelector('.edit-button');
		this.save = document.querySelector('.save')
		this.cancel = document.querySelector('.cancel');
		this.actionsMenu = document.querySelector('.actions-menu');
		this.actionsMenuTwo = document.querySelector('.actions-menu-two');
		this.previeousStyle;
		this.changeButtonSize = document.querySelector('.changeButtonSize');
		this.sizes = document.querySelector('.sizes');
		this.cnahgeFontSize = document.querySelector('.cnahgeFontSize');
		this.fontSizeForm = document.querySelector('.font-size-form');
		this.saveSizeButton = document.querySelector('.save-size-button');
		this.addLink = document.querySelector('.addLink');
		this.saveUrlButton = document.querySelector('.save-link-button');
		this.links = document.querySelectorAll('.menu-a');
		this.minSize;
		this.maxSize;
		this.openAs = document.querySelectorAll('.open-as');

		
		this.sideBar.addEventListener('click', (e) => {
			this.choseButton(e);
		})
		this.button.addEventListener('drop', (e) => {
			this.drop(e)
		})
		this.button.addEventListener('dragover', (e) => {
			this.allowDrop(e)
		})
		this.button.addEventListener('dragleave', (e) => {
			this.outDrop(e)
		})
		this.changeText.addEventListener('click', () => {
			this.editText();
		})
		this.editButton.addEventListener('click', () => {
			this.saveEdit()
		})
		this.save.addEventListener('click', (e) => {
			this.saveChanges()
		})
		this.cancel.addEventListener('click', (e) => {
			this.cancelChanges()
		})
		this.toggleIcon.addEventListener('click', () => {
			this.toggleIcons();
		})
		this.changeButtonSize.addEventListener('click', () => {
			document.querySelector('.sizes').classList.remove('hide')
		})
		this.sizes.addEventListener('click', (e) => {
			this.changeButtonSizeFunction(e);
		})
		this.cnahgeFontSize.addEventListener('click', () => {
			this.changeTextFontSize()
		})
		this.saveSizeButton.addEventListener('click', () => {
			this.saveFontSize()
		});
		this.addLink.addEventListener('click', () => {
			this.addUrl();
		});

		this.render();
	}

	render() {
		for (let i = 0; i < this.links.length; i++) {
			this.links[i].addEventListener("dragstart", (e) => {
				this.drag(e)
			})
		}

		for (let i = 0; i <this.openAs.length; i++) {
			this.openAs[i].addEventListener('click', (e) => {
				this.saveUrl(e)
			})
		}
		
	}

	choseButton(e) {
		if (this.button.children[0]) {
			return
		};

		this.workSpace.classList.add('shadow');
		this.actionsMenu.classList.remove('hide');
		this.actionsMenuTwo.classList.remove('hide');

		if (e.target.tagName === 'A' || e.target.tagName === 'SPAN') {

			if (e.target.tagName === 'SPAN') {
				this.previeousStyle = e.target.parentNode.parentNode.cloneNode(true);
				this.button.appendChild(e.target.parentNode.parentNode);
				return
			}

			this.previeousStyle = e.target.parentNode.cloneNode(true);
			this.button.appendChild(e.target.parentNode);
			return
		}
	}

	drag(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
	}

	allowDrop(e) {
		e.preventDefault();
		this.button.style['background'] = '#ededed'
	}

	outDrop(e) {
		e.preventDefault();
		this.button.style['background'] = '#fcfbeb'
	}

	drop(e) {
		if (this.button.children[0]) {
			return
		};

		this.workSpace.classList.add('shadow');
		this.actionsMenu.classList.remove('hide');
		this.actionsMenuTwo.classList.remove('hide');
		this.button.style['background'] = '#fcfbeb';
		var data = e.dataTransfer.getData("text");
		this.button.appendChild(document.getElementById(data).parentNode);
		console.log( e.target.children)
		this.previeousStyle = e.target.children[0].cloneNode(true);
	}

	editText() {
		document.querySelector('.font-size-form').classList.add('hide');
		document.querySelector('.add-link').classList.add('hide');

		let form = document.querySelector('.edit-form');
		form.classList.remove('hide');

		this.editButton = document.querySelector('.edit-button');
		let value = this.button.querySelector('.buttonName').innerHTML;
		form.querySelector('.edit-input').value = value;
	}

	saveEdit() {
		let value = document.querySelector('.edit-input').value;

		if (value.length > 14) {
			document.querySelector('.edit-input').style['background'] = '#f56f6f';
			document.querySelector('.text-alert').classList.remove('hide');

			setTimeout( () => {
				document.querySelector('.edit-input').style['background'] = '#fff';
				document.querySelector('.text-alert').classList.add('hide');
			}, 3000)
			return
		}

		let buttonName = this.button.querySelector('.buttonName');
		buttonName.innerHTML = value;
		document.querySelector('.edit-form').classList.add('hide');
	}
	toggleIcons() {
		this.button.querySelector('.icon').classList.toggle('hide');
	}
	saveChanges() {
		if (!this.button.children[0]) {
			return
		};

		let currentButton = this.button.children[0];
		this.workSpace.classList.remove('shadow')
		let button = this.button;

		let form = document.querySelector('.edit-form');
		form.classList.add('hide');

		this.sideBar.appendChild(currentButton);
		this.actionsMenu.classList.add('hide');
		this.actionsMenuTwo.classList.add('hide');
		document.querySelector('.sizes').classList.add('hide');
	}
	cancelChanges() {
		if (!this.button.children[0]) {
			return
		};

		let button = this.button;

		let form = document.querySelector('.edit-form');
		form.classList.add('hide');

		this.workSpace.classList.remove('shadow')
		this.actionsMenu.classList.add('hide');
		this.actionsMenuTwo.classList.add('hide');
		console.log(this.previeousStyle)
		document.querySelector('.sizes').classList.add('hide')
		this.sideBar.appendChild(this.previeousStyle);
		this.workSpace.querySelector('.button').innerHTML = '';
	}

	changeButtonSizeFunction(e) {
		let size = e.target.classList[1];
		let button = this.button;
		let li = this.button.children[0];
		let a = this.button.children[0].children[0];
		let span = this.button.querySelector('.buttonName');

		if (size === 'small') {   
			button.style['width'] = 180 + 'px';
			button.style['height'] = 42 + 'px';
			button.style['left'] = 380 + 'px';
			button.style['top'] = 174 + 'px';

			li.style['width'] = 180 + 'px';
			li.style['height'] = 42 + 'px';

			a.style['padding-top'] = 4 + 'px';
			a.style['padding-bottom'] = 4 + 'px';

			span.style['font-size'] = 14 + 'px';
			
      setTimeout( () => {
				document.querySelector('.sizes').classList.add('hide')
			}, 100);

			return
		}

		if (size === 'middle') {
			button.style['width'] = 270 + 'px';
			button.style['height'] = 60 + 'px';
			button.style['left'] = 330 + 'px';
			button.style['top'] = 164 + 'px';

			li.style['width'] = 270 + 'px';
			li.style['height'] = 60 + 'px';

			a.style['padding-top'] = 12 + 'px'
			a.style['padding-bottom'] = 12 + 'px';

			span.style['font-size'] = 16 + 'px';

			setTimeout( () => {
				document.querySelector('.sizes').classList.add('hide')
			}, 100);
			return
		}
		if (size === 'large') {
			button.style['width'] = 500 + 'px';
			button.style['height'] = 74 + 'px';
			button.style['left'] = 214 + 'px';
			button.style['top'] = 160 + 'px';

			li.style['width'] = 100 + '%';
			li.style['height'] = 74 + 'px';

			a.style['padding-top'] = 18 + 'px'
			a.style['padding-bottom'] = 18 + 'px';

			span.style['font-size'] = 20 + 'px';

			setTimeout(() => {
				document.querySelector('.sizes').classList.add('hide')
			}, 100);

			return
		}
	}

	changeTextFontSize() {
		document.querySelector('.add-link').classList.add('hide');
		document.querySelector('.edit-form').classList.add('hide');

		 this.openAs.forEach( (i, index) => {
			setTimeout(() => {
				i.classList.add('hide');
			}, (index * 0.5) * 120);
		})

		let width = getComputedStyle(this.button, null).width;

		if (width === '270px') {
			document.querySelector('.edit-size').placeholder = 'form 8 to 24';
			this.defineSize();
			this.minSize = 8;
			this.maxSize = 24;
			return;
		}

		if (width === '180px') {
			document.querySelector('.edit-size').placeholder = 'form 8 to 16';
			this.defineSize();
			this.minSize = 8;
			this.maxSize = 16;
			return;
		}
		this.minSize = 10;
		this.maxSize = 30;
		this.defineSize();
	}

	defineSize() {
		let text = this.button.querySelector('.buttonName')
		let size = window.getComputedStyle(text, null).fontSize.substring(0, 2);
		this.fontSizeForm.classList.remove('hide');
		this.fontSizeForm.children[0].value = size;
	}

	saveFontSize() {
		let size = +document.querySelector('.edit-size').value;

		if (size < this.minSize || size > this.maxSize) {
			let alert = document.querySelector('.alert');
			alert.querySelector('span').innerHTML = `Incorrect number. Only from ${this.minSize} to ${this.maxSize}`;
			alert.classList.remove('hide')

			setTimeout( () => {
				this.fontSizeForm.classList.add('hide');
				document.querySelector('.alert').classList.add('hide');
			}, 2000)

			return
		}

		let text = this.button.querySelector('.buttonName');
		text.style['font-size'] = size + 'px';

		setTimeout( () => {
			this.fontSizeForm.classList.add('hide');
		}, 100)
	}

	addUrl() {
		document.querySelector('.font-size-form').classList.add('hide');
		document.querySelector('.edit-form').classList.add('hide');

		let div = document.querySelector('.add-link')
		div.classList.remove('hide');

		this.openAs.forEach( (i, index) => {
			setTimeout(() => {
				i.classList.remove('hide');
			}, (index * 0.5) * 100);
		})
		
	}

	saveUrl(e) {
		if (!document.querySelector('.edit-url').value.length) {
			document.querySelector('.url-alert').classList.remove('hide');

			setTimeout(function() {
				document.querySelector('.url-alert').classList.add('hide');
			}, 2000);
			return
		}

		let type = e.target.classList[0];
		let value = document.querySelector('.edit-url').value;

		if (type === 'page') {
			let url = this.checkUrl(value);
			this.button.querySelector('a').href = '';
			this.button.querySelector('a').href = url;
			return;
		}

		if (type === 'tab') {
			let url = this.checkUrl(value);
			this.button.querySelector('a').addEventListener('click', () => {
				window.open(url,'_blank')
			})
			return;
		}

		if (type === 'window') {
			let url = this.checkUrl(value);
			this.button.querySelector('a').addEventListener('click', () => {
		 		window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=100,width=400,height=400")
		 	})
			return;
		}
	}

	checkUrl(value) {
		let link = value;

		if (link.substring(0,7) === 'http://' || link.substring(0,8) === 'https://') {
			return link;
			
			this.urlHide()
		 	return;
		}

		let url = 'http://' + link;
		this.urlHide()
		return url
	}

	urlHide() {
		 document.querySelector('.edit-url').value = '';
		 document.querySelector('.add-link').classList.add('hide');

		 this.openAs.forEach( (i, index) => {
			setTimeout(() => {
				i.classList.add('hide');
			}, (index * 0.5) * 120);
		})
	}


}
