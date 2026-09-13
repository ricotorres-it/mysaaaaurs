const memories = [
  {
    src: new URL("./assets/Orbit/1st aurora festival.jpg", import.meta.url).href,
    title: "1st Aurora Festival ♡",
    note: "Good music, brighter us. Kahit sobrang daming tao, ikaw pa rin favorite kong kasama ehehe.",
    question: "Ano pinaka-favorite mong part nung Aurora Festival natin?",
    answers: ["Yung fireworks ♡", "Syempre ikaw ehehe"],
  },
  {
    src: new URL("./assets/Orbit/572777187_18360184372089794_420531774941395154_n.jpg", import.meta.url).href,
    title: "Saur being saur ♡",
    note: "Kahit simpleng selfie lang, favorite ko pa rin basta ikaw yung katabi ko.",
    question: "Sino mas clingy sa ating dalawa?",
    answers: ["Ako 😌", "Ikaw talaga 😂"],
  },
  {
    src: new URL("./assets/Orbit/590961626_18363533965089794_3114849614637917410_n.jpg", import.meta.url).href,
    title: "Kilig much ehe ♡",
    note: "Daming gala, daming tawanan, daming kulit — pero ikaw talaga yung favorite part ko.",
    question: "Ano mas marami sa dates natin?",
    answers: ["Kain 😂", "Kulitan at lambing ♡"],
  },
  {
    src: new URL("./assets/Orbit/612406237_18368556379089794_7726493668007717202_n.jpg", import.meta.url).href,
    title: "Date ulit soon ♡",
    note: "Na-miss natin mag date hehehe. Soon ulit ah. Iloveyouuu, saur!",
    question: "Kung may date tayo bukas, saan mo gusto?",
    answers: ["Food trip tayo ♡", "Kahit saan basta ikaw"],
  },
  {
    src: new URL("./assets/Orbit/aurora.jpg", import.meta.url).href,
    title: "Same us, always ♡",
    note: "More places, more memories, more kulit. Basta sabay tayo palagi.",
    question: "Ready ka pa ba sa mas marami pang gala with me?",
    answers: ["YESSSS ♡", "Syempre, saur!"],
  },
]

const reasons = [
  "Kahit ordinary day, napapasaya mo ako nang hindi mo alam.",
  "Ikaw yung gusto kong kasama sa gala, sa pagkain, at kahit sa tahimik na araw.",
  "Kahit nag-aaway o nagtatampo tayo, ikaw pa rin yung pipiliin ko.",
  "You make me want to build all our dreams together, one step at a time.",
  "Because you're my Jenny Saur. Ikaw lang, palagi. ♡",
]

const pages = Array.from(document.querySelectorAll(".page"))
const memoryState = {
  index: 0,
  answered: new Set(),
  liked: false,
  startX: 0,
  dragX: 0,
  dragging: false,
}
const finalState = {
  found: new Set(),
  active: null,
  choice: null,
}

function showPage(pageNumber) {
  const safePage = Math.min(6, Math.max(1, Number(pageNumber) || 1))
  pages.forEach((page) => {
    const active = Number(page.dataset.page) === safePage
    page.classList.toggle("active", active)
    page.setAttribute("aria-hidden", String(!active))
  })

  document.body.dataset.page = String(safePage)

  if (safePage !== 2) {
    const audio = document.getElementById("anniversary-voice-audio")
    if (audio && !audio.paused) audio.pause()
  }

  window.scrollTo({ top: 0, behavior: "auto" })
  try { history.replaceState(null, "", `#page-${safePage}`) } catch (_) {}
}

function safeInit(name, callback) {
  try {
    callback()
  } catch (error) {
    console.error(`[saursaur] ${name} failed`, error)
  }
}

// One navigation owner for all six pages.
document.addEventListener("click", (event) => {
  const element = event.target instanceof Element ? event.target : null
  if (!element) return

  const nav = element.closest("[data-go]")
  if (nav) {
    const nextPage = Number(nav.getAttribute("data-go"))
    if (Number.isFinite(nextPage)) {
      event.preventDefault()
      showPage(nextPage)
      return
    }
  }

  if (element.closest("#next-chapter-continue")) {
    event.preventDefault()
    showPage(6)
  }
})

window.addEventListener("hashchange", () => {
  const found = location.hash.match(/page-(\d+)/)
  if (found) showPage(Number(found[1]))
})

safeInit("sakura petals", () => {
  const layer = document.getElementById("petals")
  if (!layer || matchMedia("(prefers-reduced-motion: reduce)").matches) return

  layer.replaceChildren()
  const count = innerWidth < 600 ? 22 : 32
  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement("i")
    petal.className = "petal"
    const size = 8 + Math.random() * 12
    petal.style.width = `${size}px`
    petal.style.height = `${size * 0.68}px`
    petal.style.left = `${Math.random() * 100}vw`
    petal.style.opacity = String(0.38 + Math.random() * 0.48)
    petal.style.animationDuration = `${8 + Math.random() * 10}s,${2 + Math.random() * 3}s`
    petal.style.animationDelay = `${-Math.random() * 18}s,${-Math.random() * 4}s`
    petal.style.setProperty("--drift", `${-90 + Math.random() * 180}px`)
    layer.appendChild(petal)
  }
})

safeInit("catchable hearts", () => {
  const target = 5
  let caught = 0
  let locked = false
  const hearts = []

  const popup = document.createElement("div")
  popup.className = "catch-popup"
  popup.hidden = true
  popup.innerHTML = '<div class="catch-popup-card"><button class="catch-popup-close" type="button" aria-label="Close">×</button><span class="catch-popup-heart">♡</span><h2>You found all my love, saaaaurs ♡</h2><p>5 little hearts caught. All of them were yours anyway ♡</p></div>'
  document.body.appendChild(popup)

  const place = (heart, index) => {
    const leftLane = index % 2 === 0
    heart.style.left = `${leftLane ? 2 + Math.random() * 11 : 87 + Math.random() * 10}vw`
    heart.style.top = `${13 + Math.random() * 58}vh`
    heart.style.opacity = String(0.82 + Math.random() * 0.16)
    heart.style.animationDuration = `${13 + Math.random() * 7}s,${2.4 + Math.random() * 2.5}s,1.5s`
    heart.style.setProperty("--drift", `${-26 + Math.random() * 52}px`)
  }

  const reset = () => {
    caught = 0
    locked = false
    hearts.forEach((heart, index) => {
      heart.classList.remove("round-caught")
      heart.dataset.caught = "false"
      heart.disabled = false
      place(heart, index)
      heart.style.animation = "none"
      void heart.offsetHeight
      heart.style.animation = ""
    })
  }

  const close = () => {
    popup.classList.remove("open")
    window.setTimeout(() => {
      popup.hidden = true
      reset()
    }, 220)
  }

  popup.querySelector(".catch-popup-close")?.addEventListener("click", close)
  popup.addEventListener("click", (event) => {
    if (event.target === popup) close()
  })

  for (let i = 0; i < target; i += 1) {
    const heart = document.createElement("button")
    heart.className = "catchable-heart"
    heart.type = "button"
    heart.textContent = i % 2 ? "♡" : "♥"
    heart.dataset.caught = "false"
    heart.setAttribute("aria-label", `Catch love heart ${i + 1} of ${target}`)
    place(heart, i)

    heart.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()
      if (locked || heart.dataset.caught === "true") return

      heart.dataset.caught = "true"
      heart.classList.add("round-caught")
      heart.disabled = true
      caught += 1

      const burst = document.createElement("span")
      burst.className = "catch-love-burst"
      burst.textContent = caught < target ? `+1 ♡ ${caught}/${target}` : "♡♡♡"
      burst.style.left = `${event.clientX}px`
      burst.style.top = `${event.clientY}px`
      document.body.appendChild(burst)
      window.setTimeout(() => burst.remove(), 680)

      if (caught === target) {
        locked = true
        window.setTimeout(() => {
          popup.hidden = false
          requestAnimationFrame(() => popup.classList.add("open"))
        }, 220)
      }
    })

    hearts.push(heart)
    document.body.appendChild(heart)
  }
})

const letterText = `Happy first annivesary saur, i know marami na tayong pinag daanan at marami pa tayong pag dadaanan pa. Just keep it up ok? I know we can do it together. Lahat ng dreams at goal natin magagawa natin ng sabay. Tulungan lang tayo.\n\nSorry kung marami akong nagiging pagkukulang sayo, maraming salamat sa pag intindi saken.\n\nPalagi mong tatandaan na mahal na mahal kita. Gagawin ko ang lahat para lang maging masaya yung saur ko <3. Soon, wala na tayong iintindihing problema ibibigay ko sayo lahat. Gagawin ko yung best ko para maging best boyfriend sayo. Laban lang ha, muuwahh :*.\n\nHappy Anniversary Jenny Saur <3`

safeInit("love letter", () => {
  const paper = document.querySelector(".letter-paper")
  if (!paper || !paper.parentElement || paper.closest(".letter-reveal")) return

  const wrapper = document.createElement("div")
  wrapper.className = "letter-reveal"

  const envelope = document.createElement("button")
  envelope.className = "love-envelope"
  envelope.type = "button"
  envelope.innerHTML = '<span class="envelope-back"></span><span class="envelope-paper">For my Jenny Saur ♡</span><span class="envelope-flap"></span><span class="envelope-front"></span><span class="envelope-seal">♥</span><span class="envelope-label">Tap to open my letter ♡</span>'

  const typed = document.createElement("div")
  typed.className = "typed-letter"

  const secret = document.createElement("button")
  secret.className = "secret-love-trigger"
  secret.type = "button"
  secret.textContent = "♡"
  secret.hidden = true

  paper.classList.add("letter-paper-reveal")
  paper.replaceChildren()
  const tape = document.createElement("span")
  tape.className = "tape tape-top"
  paper.append(tape, typed, secret)
  paper.parentElement.replaceChild(wrapper, paper)
  wrapper.append(envelope, paper)

  envelope.addEventListener("click", () => {
    if (wrapper.classList.contains("open")) return
    wrapper.classList.add("open")
    typed.classList.add("typing")
    let index = 0

    const typeNext = () => {
      typed.textContent = letterText.slice(0, index)
      index += 1
      if (index <= letterText.length + 1) {
        window.setTimeout(typeNext, 9)
      } else {
        typed.classList.remove("typing")
        secret.hidden = false
      }
    }
    typeNext()
  })

  const popup = document.createElement("div")
  popup.className = "love-popup"
  popup.hidden = true
  popup.innerHTML = '<div class="love-popup-card"><button class="love-popup-close" type="button" aria-label="Close">×</button><span class="love-popup-heart">♡</span><p>You found all my love ♡</p><span>And yup, it\'s all yours, saur.</span></div>'
  document.body.appendChild(popup)

  const close = () => {
    popup.classList.remove("open")
    window.setTimeout(() => { popup.hidden = true }, 220)
  }

  secret.addEventListener("click", () => {
    popup.hidden = false
    requestAnimationFrame(() => popup.classList.add("open"))
  })
  popup.querySelector(".love-popup-close")?.addEventListener("click", close)
  popup.addEventListener("click", (event) => {
    if (event.target === popup) close()
  })
})

safeInit("voice note", () => {
  const audio = document.getElementById("anniversary-voice-audio")
  const button = document.getElementById("anniversary-voice-button")
  const icon = document.getElementById("anniversary-voice-icon")
  const label = document.getElementById("anniversary-voice-label")
  if (!audio || !button || !icon || !label) return

  audio.src = new URL("./assets/voice memo.m4a", import.meta.url).href

  const stopped = () => {
    icon.textContent = "▶"
    label.textContent = "Play my message ♡"
  }

  button.addEventListener("click", async () => {
    try {
      if (audio.paused) await audio.play()
      else audio.pause()
    } catch (_) {
      label.textContent = "Tap again to play ♡"
    }
  })

  audio.addEventListener("play", () => {
    icon.textContent = "❚❚"
    label.textContent = "Pause my message ♡"
  })
  audio.addEventListener("pause", stopped)
  audio.addEventListener("ended", stopped)
})

function renderMemoryPage() {
  const root = document.getElementById("stack-root")
  if (!root) return

  const current = memories[memoryState.index]
  const answered = memoryState.answered.has(memoryState.index)
  root.replaceChildren()

  const shell = document.createElement("div")
  shell.className = "memory-stack-shell"
  root.appendChild(shell)

  if (!answered) {
    const quiz = document.createElement("section")
    quiz.className = "memory-quiz"
    quiz.innerHTML = `
      <span class="quiz-kicker">DO YOU REMEMBER THIS? ♡</span>
      <div class="quiz-hidden-photo" aria-hidden="true"><img alt=""><span>?</span></div>
      <h2></h2>
      <p>Kahit anong sagot mo, cute ka pa rin ehehe.</p>
      <div class="quiz-answers"></div>`

    quiz.querySelector("img").src = current.src
    quiz.querySelector("h2").textContent = current.question
    const answers = quiz.querySelector(".quiz-answers")

    current.answers.forEach((answer) => {
      const button = document.createElement("button")
      button.type = "button"
      button.textContent = answer
      button.addEventListener("click", () => {
        memoryState.answered.add(memoryState.index)
        renderMemoryPage()
      })
      answers.appendChild(button)
    })

    shell.appendChild(quiz)
    return
  }

  const stage = document.createElement("div")
  stage.className = "memory-stack-stage"
  const stack = [0, 1, 2].map((offset) => memories[Math.min(memoryState.index + offset, memories.length - 1)])

  stack.forEach((memory, offset) => {
    const card = document.createElement("article")
    card.className = `memory-polaroid ${offset === 0 ? "front" : "behind"}`
    card.style.zIndex = String(10 - offset)
    const rotation = offset === 0 ? 0 : offset === 1 ? -4 : 5
    card.style.transform = `translate3d(0, ${offset * 12}px, 0) rotate(${rotation}deg) scale(${1 - offset * 0.055})`
    card.innerHTML = '<img draggable="false"><div class="memory-polaroid-copy"><h2></h2><p></p></div>'

    card.querySelector("img").src = memory.src
    card.querySelector("img").alt = memory.title
    card.querySelector("h2").textContent = memory.title
    card.querySelector("p").textContent = memory.note

    if (offset === 0) {
      const resetTransform = () => {
        memoryState.dragX = 0
        memoryState.dragging = false
        card.style.transition = "transform 220ms ease"
        card.style.transform = "translate3d(0,0,0) rotate(0deg) scale(1)"
      }

      card.addEventListener("pointerdown", (event) => {
        memoryState.startX = event.clientX
        memoryState.dragX = 0
        memoryState.dragging = true
        card.style.transition = "none"
        card.setPointerCapture?.(event.pointerId)
      })

      card.addEventListener("pointermove", (event) => {
        if (!memoryState.dragging) return
        memoryState.dragX = event.clientX - memoryState.startX
        card.style.transform = `translate3d(${memoryState.dragX}px,0,0) rotate(${memoryState.dragX / 28}deg) scale(1)`
      })

      card.addEventListener("pointerup", (event) => {
        if (!memoryState.dragging) return
        if (card.hasPointerCapture?.(event.pointerId)) card.releasePointerCapture(event.pointerId)
        const drag = memoryState.dragX
        resetTransform()
        if (Math.abs(drag) > 55) {
          if (drag < 0) nextMemory()
          else previousMemory()
        }
      })

      card.addEventListener("pointercancel", resetTransform)
    }

    stage.appendChild(card)
  })

  shell.appendChild(stage)

  const hint = document.createElement("p")
  hint.className = "memory-swipe-hint"
  hint.textContent = memoryState.index === memories.length - 1
    ? "Last memory ♡ Tap Our next chapter below."
    : "Swipe left or right for more memories ♡"
  shell.appendChild(hint)

  const controls = document.createElement("div")
  controls.className = "memory-stack-controls"

  const previous = document.createElement("button")
  previous.type = "button"
  previous.disabled = memoryState.index === 0
  previous.setAttribute("aria-label", "Previous memory")
  previous.textContent = "←"
  previous.addEventListener("click", previousMemory)

  const counter = document.createElement("span")
  counter.textContent = `${memoryState.index + 1} / ${memories.length}`

  const heart = document.createElement("button")
  heart.type = "button"
  heart.className = memoryState.liked ? "liked" : ""
  heart.setAttribute("aria-label", memoryState.liked ? "Remove heart" : "Heart this memory")
  heart.textContent = memoryState.liked ? "♥" : "♡"
  heart.addEventListener("click", () => {
    memoryState.liked = !memoryState.liked
    renderMemoryPage()
  })

  const next = document.createElement("button")
  next.type = "button"
  next.setAttribute("aria-label", memoryState.index === memories.length - 1 ? "Continue to our next chapter" : "Next memory")
  next.textContent = "→"
  next.addEventListener("click", nextMemory)

  controls.append(previous, counter, heart, next)
  shell.appendChild(controls)

  if (memoryState.index === memories.length - 1) {
    const continueButton = document.createElement("button")
    continueButton.className = "memory-final-continue flow-final-continue"
    continueButton.type = "button"
    continueButton.textContent = "Our next chapter ♡ →"
    continueButton.addEventListener("click", () => showPage(5))
    shell.classList.add("has-final-continue")
    shell.appendChild(continueButton)
  }
}

function previousMemory() {
  if (memoryState.index <= 0) return
  memoryState.index -= 1
  memoryState.liked = false
  renderMemoryPage()
}

function nextMemory() {
  if (memoryState.index >= memories.length - 1) {
    showPage(5)
    return
  }

  memoryState.index += 1
  memoryState.liked = false
  renderMemoryPage()
}

function resetMemories() {
  memoryState.index = 0
  memoryState.answered = new Set()
  memoryState.liked = false
  memoryState.dragX = 0
  memoryState.dragging = false
  renderMemoryPage()
}

safeInit("next chapter interactions", () => {
  document.querySelectorAll(".next-envelope").forEach((envelope) => {
    envelope.addEventListener("click", () => {
      const isOpen = envelope.classList.toggle("open")
      envelope.setAttribute("aria-expanded", String(isOpen))
    })
  })

  document.querySelectorAll(".next-plan").forEach((plan) => {
    plan.addEventListener("click", () => {
      const isDone = plan.classList.toggle("done")
      plan.setAttribute("aria-pressed", String(isDone))
    })
  })

  const continueButton = document.getElementById("next-chapter-continue")
  continueButton?.addEventListener("click", () => showPage(6))
})

function renderFinalPage() {
  const root = document.getElementById("final-root")
  if (!root) return
  root.replaceChildren()

  const section = document.createElement("section")
  section.className = "final-surprise final-page-surprise"
  section.innerHTML = `
    <span class="final-surprise-heart">♡</span>
    <p>AND THIS IS ONLY OUR FIRST YEAR...</p>
    <h2>See you in all the next chapters, saur ♡</h2>
    <span class="final-surprise-note">More dates. More adventures. More kulit. More us.</span>
    <div class="reasons-reveal">
      <h3>5 reasons I choose you ♡</h3>
      <p class="reasons-hint">Tap each heart, saaaaurs.</p>
      <div class="reason-hearts" aria-label="Reasons I choose you"></div>
      <div class="reason-message" aria-live="polite"></div>
      <small></small>
    </div>
    <div class="final-dynamic"></div>
    <div class="final-page-actions"></div>`

  const hearts = section.querySelector(".reason-hearts")
  reasons.forEach((reason, index) => {
    const button = document.createElement("button")
    button.type = "button"
    button.className = finalState.found.has(index) ? "found" : ""
    button.setAttribute("aria-label", `Reveal reason ${index + 1}`)
    button.textContent = finalState.found.has(index) ? "♥" : "♡"
    button.addEventListener("click", () => {
      finalState.found.add(index)
      finalState.active = index
      renderFinalPage()
    })
    hearts.appendChild(button)
  })

  const message = section.querySelector(".reason-message")
  message.textContent = finalState.active === null
    ? "May limang dahilan dito na para sayo lang ♡"
    : reasons[finalState.active]

  section.querySelector(".reasons-reveal small").textContent = `${finalState.found.size} / ${reasons.length} hearts found`

  const dynamic = section.querySelector(".final-dynamic")

  if (finalState.found.size >= reasons.length && !finalState.choice) {
    const choice = document.createElement("div")
    choice.className = "final-choice"
    choice.innerHTML = '<span>One last question...</span><h3>Stay with me for another year? ♡</h3><div></div>'
    const actions = choice.querySelector("div")

    ;["Yes ♡", "Of course ♡"].forEach((label) => {
      const button = document.createElement("button")
      button.type = "button"
      button.textContent = label
      button.addEventListener("click", () => {
        finalState.choice = label
        renderFinalPage()
      })
      actions.appendChild(button)
    })

    dynamic.appendChild(choice)
  }

  if (finalState.choice) {
    const answer = document.createElement("div")
    answer.className = "choice-answer"
    answer.innerHTML = '<span>♡</span><h3>Knew it, saaaaurs 😚</h3><p>I love you. Another year, another chapter, still us. ♡</p>'
    dynamic.appendChild(answer)
  }

  const footer = section.querySelector(".final-page-actions")

  const replay = document.createElement("button")
  replay.className = "replay-button"
  replay.type = "button"
  replay.textContent = "↻ Replay our memories"
  replay.addEventListener("click", () => {
    resetMemories()
    showPage(4)
  })

  const start = document.createElement("button")
  start.className = "replay-button final-start-button"
  start.type = "button"
  start.textContent = "Start again ♡"
  start.addEventListener("click", () => {
    resetMemories()
    finalState.found = new Set()
    finalState.active = null
    finalState.choice = null
    renderFinalPage()
    showPage(1)
  })

  footer.append(replay, start)
  root.appendChild(section)
}

safeInit("memory page", renderMemoryPage)
safeInit("final page", renderFinalPage)

const initialHash = location.hash.match(/page-(\d+)/)
showPage(initialHash ? Number(initialHash[1]) : 1)
window.saursaurGo = showPage
window.__saursaurAppReady = true
