


class AbstractModel{
    state: GVAPP.TreeNode;
    constructor(node:GVAPP.TreeNode){
        this.state = node;  
    }
    get id(){
        return this.state.id
    }

    get parentId(){
        return this.state.parentId
    }

    setChecked(checked){
        // doing nothing
    }
    zoomTo(){
        
    }

    destroy(){
        
    }
}

export default AbstractModel;