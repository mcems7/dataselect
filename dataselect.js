
class DataList {
	constructor(containerId, inputId, listId, options_id) {
		this.containerId = containerId;
		this.inputId = inputId;
		this.listId = listId;
		this.options_id = options_id;
        var opciones = document.querySelector('#'+this.options_id);
        opciones.style.display = 'none';
        var span = document.createElement('span');
        var div = document.createElement('div');
        var ul = document.createElement('ul');
        var i = document.createElement('i');
        var input = document.createElement('input');
        var datalist = document.createElement('datalist');
        datalist.id = "list_"+options_id;
        span.className="dataselect";
        div.id=containerId;
        div.className="datalist";
        input.id=inputId;
        input.className="datalist-input";
        ul.id=listId;
        ul.className="datalist-ul";
        i.className="datalist-icon icon iconfont icon-arrow";
        input.setAttribute('placeholder', "Seleccione");
        div.appendChild(ul);
        div.appendChild(i);
        div.appendChild(input);
        span.appendChild(div);
        datalist.innerHTML = opciones.innerHTML;
        opciones.parentNode.insertBefore(span,opciones.nextSibling);
        var list = opciones.childNodes;
        let data = [];
        list.forEach(
            function(currentValue, currentIndex, listObj){
                if(currentValue.value!=undefined){
                    var current = {value: currentValue.value, text:currentValue.textContent};
                    data.push(current);
                }
            }
        );
		this.options = data;
	}

	create(filter = ""){
		const list = document.getElementById(this.listId);
		const filterOptions = this.options.filter(
			d => filter.toLowerCase() === "" || d.text.toLowerCase().includes(filter)
		);

		if (filterOptions.length === 0) {
			list.classList.remove("active");
		} else {
			list.classList.add("active");
		}

		list.innerHTML = filterOptions
			.map(o => `<li id=${o.value}>${o.text}</li>`)
			.join("");
	}

	addListeners(datalist) {
		const container = document.getElementById(this.containerId);
		const input = document.getElementById(this.inputId);
		const list = document.getElementById(this.listId);
		container.addEventListener("click", e => {
			if (e.target.id === this.inputId) {
				container.classList.toggle("active");
			} else if (e.target.id === "datalist-icon") {
				container.classList.toggle("active");
				input.focus();
			}
		});

		input.addEventListener("input", function(e) {
			if (!container.classList.contains("active")) {
				container.classList.add("active");
			}

			datalist.create(input.value);
		});
        var options_id = this.options_id;
        var inputId = this.inputId;
		list.addEventListener("click", function(e) {
			if (e.target.nodeName.toLocaleLowerCase() === "li") {
				input.value = e.target.innerText;
                document.querySelector('#'+options_id).value=e.target.id;
				container.classList.remove("active");
                document.querySelector('#'+inputId).focus();
                
			}
		});
	}
}

function dataselect(id){
const datalist = new DataList(
	id+"datalist",
	id+"datalist-input",
	id+"datalist-ul",
	id
);
datalist.create();
datalist.addListeners(datalist);
}