/*
     Project    : Grocery List Project using HTML, CSS, Javascript, jQuery
     Created by : K. Deepak Kumar
     Contact at : deepakplay14@gmail.com
*/

"use strict";
$(document).ready(function(){
    let state = [{id:1,val:'Deepak Kumar'}, {id:2, val:'deepakplay.com'}]
    const domStrings = {
        submit:'.submit',
        itemText:'#itemText',
        itemList:'.grocery_list',
        itemName:'.item_name',
        clearItem:'.clearItem',
        edit:'edit',
		errorInput:'errorInput',
        delete:'delete'
    };

    const getItem = function(){
        const input = $(domStrings.itemText)
        const val = input.val();
        input.val('');
        input.focus();
		if(!val.length){
			if(!input.hasClass(domStrings.errorInput)){
				input.addClass(domStrings.errorInput);
			}			
			return false;
		}else{
			input.removeClass(domStrings.errorInput);
			return val;
		}
        
    }

    const addItemUI = function(obj){
        let html = $(`<li class="grocery_item" id="item-${obj.id}">
                            <span class="item_name">${obj.val}</span>
                            <div class="item_op">
                                <button class="edit"><i class="fas fa-pen"></i></button>
                                <button class="delete"><i class="fas fa-trash"></i></button>
                            </div>
                        </li>`).hide();
        $(domStrings.itemList).append(html);
        html.slideDown(200);
    }

    const addItem = function(item){
        const obj = {
            id: (state.length)?state[state.length-1].id+1:1,
            val: item
        }
        state.push(obj);
        addItemUI(obj);
    }

    const itemRemove = function(item){
        $('#'+item).slideUp(200, function(){
            $(this).remove();
        });
    }

    const onButtonClicked = function(event){
        if(event.which===13 || event.type==='click'){
            let item = getItem();
            if(item)addItem(item);
            event.preventDefault();    
        };
    };

    const itemClick = function(event){
        let target = $(event.target);
        if(target.parent().hasClass(domStrings.edit)|| target.hasClass(domStrings.edit)) {
            target = target.closest('li').attr('id');
            const id = parseInt(target.split('-')[1].trim());
            const index = state.findIndex((item)=>item.id==id);
            state[index].val = prompt("Enter new item", state[index].val) || state[index].val;
		$('#'+target+' '+domStrings.itemName).fadeOut(50,function(){
				$(this).text(state[index].val).fadeIn(100);
		});
        }else if(target.parent().hasClass(domStrings.delete)|| target.hasClass(domStrings.delete)){
            target = target.closest('li').attr('id');
            const id = parseInt(target.split('-')[1].trim());
            state.splice(state.findIndex((item)=>item.id==id), 1);
            itemRemove(target);
        }
    }
    
    $(document).keypress(onButtonClicked);
    $(domStrings.submit).click(onButtonClicked);
    $(domStrings.itemList).click(itemClick);
    $(domStrings.clearItem).click(function(){
        state = [];
        $(domStrings.itemList).empty();
    });
    state.forEach((obj)=>addItemUI(obj));
})