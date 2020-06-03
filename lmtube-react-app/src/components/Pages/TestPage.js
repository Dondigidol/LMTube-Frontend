import React from "react"

class TestPage extends React.Component{
    
    render (){        
        return (
            <div>
                <iframe
                    title="Заголовок"
                    src="http://localhost:3000/embed/1"
                    frameBorder="0"
                    height= "300"
                    width={300*1.77}
                    >
                </iframe>
            </div>
        )
    }    
}

export default TestPage;