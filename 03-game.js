const startBtn = document.querySelector(".start-btn")
const container = document.querySelector(".container")
const result = document.querySelector(".result")


startBtn.addEventListener("click", handleClick)
function handleClick() {
    startBtn.disabled = true
    result.textContent = ""
    const promises = [...container.children].map(() => {
        return new Promise((resolve,reject) => {
            const random = Math.random();
            if (random > 0.5) {
                resolve("🤑");
            } else {
                reject("👿");
            }
        })
    }
    )
    Promise.allSettled(promises)
        .then(data => {
            data.forEach((item, i) => {
                container.children[i].textContent = ""
                setTimeout(() => {
                    container.children[i].textContent = item.value || item.reason
                    if (i === data.length -1) {
                        const instance = basicLightbox.create(`
                         <div class="modal">
                            <h1>${isWinner ? "winner" : "loser"}</h1>
                         </div>
`)
                        
                        instance.show()
                        
                        startBtn.disabled = false
                    }
                },1000 *(i + 1))
                
            })
            
            const isWinner =
                data.every((item) => item.status === "fulfilled") ||
                data.every(item => item.status === "rejected")
            
            
    })
}

