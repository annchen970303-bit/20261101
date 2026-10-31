// 儲存六道美食測驗的題目、選項、正確答案與解說。
const quizData = [
  { image: null, question: "請問照片中這道由醋飯與新鮮生魚片組合而成的傳統日本料理，是來自哪一個國家？", options: ["韓國", "日本", "泰國", "中國"], answer: "日本", explanation: "壽司是日本最具代表性的傳統美食之一，透過醋飯與生魚片等豐富食材搭配聞名全世界！" },
  { image: null, question: "這道外皮酥脆、裹著甜辣醬汁且深受年輕人喜愛的「韓式炸雞」，是哪國的國民美食？", options: ["日本", "韓國", "新加坡", "越南"], answer: "韓國", explanation: "韓式炸雞結合特製的甜辣醬料或醬油蒜香，是代表性的韓國飲食文化。" },
  { image: null, question: "這碗加入蝦子、檸檬葉、香茅與辣椒，口感酸辣開胃的「冬蔭功湯」，是哪裡的名菜？", options: ["韓國", "泰國", "新加坡", "日本"], answer: "泰國", explanation: "冬蔭功是泰國的國菜級湯品，「冬蔭」意為酸辣，「功」則是蝦子。" },
  { image: null, question: "這道用透明米紙包裹著鮮蝦、米線與生菜，口感清爽不油膩的「生春捲」，屬於哪國的美食？", options: ["西班牙", "越南", "泰國", "韓國"], answer: "越南", explanation: "越南生春捲使用透明柔軟的米皮包裹豐富餡料，沾上酸甜魚露醬是其精髓。" },
  { image: null, question: "這盤使用香米烹煮、搭配鮮嫩白切雞與特製辣椒醬的「海南雞飯」，是哪國的代表美食？", options: ["越南", "新加坡", "日本", "西班牙"], answer: "新加坡", explanation: "海南雞飯被視為新加坡的國菜之一，極度講究雞肉軟嫩度與米飯油香。" },
  { image: null, question: "這道用平底鍋烹煮、金黃色的米飯吸滿海鮮精華與番紅花香氣的料理，源自哪裡？", options: ["法國", "義大利", "西班牙", "德國"], answer: "西班牙", explanation: "西班牙海鮮飯（Paella）是地中海沿岸傳統名菜，以番紅花賦予金黃色澤與香氣。" }
]; // 完成測驗題目資料設定。

// 建立畫面狀態、答題進度與畫面互動所需資料。
let currentScreen = "start"; // 記錄目前顯示的頁面。
let currentQuestion = 0; // 記錄目前題目索引。
let selectedOption = -1; // 記錄目前選取的選項索引。
let correctCount = 0; // 記錄答對題數。
let isAnswerCorrect = false; // 記錄目前題目的作答結果。
let buttons = []; // 儲存本幀所有可點擊按鈕的位置。
let optionAreas = []; // 儲存目前題目各選項的位置。

// 載入題目圖片，確保正式繪製前圖片已準備完成。
function preload() { // 開始載入所有題目圖片。
  for (let i = 0; i < quizData.length; i++) { // 依序處理每一道題目。
    quizData[i].image = loadImage(`1/${i + 1}.jpg`); // 載入對應題號的圖片檔。
  } // 結束圖片載入迴圈。
} // 完成圖片載入函式。

// 建立填滿瀏覽器視窗的 p5.js 畫布並設定文字顯示方式。
function setup() { // 開始設定測驗畫布。
  createCanvas(windowWidth, windowHeight); // 建立與視窗同尺寸的畫布。
  textFont("sans-serif"); // 使用系統無襯線字型顯示介面文字。
  textAlign(CENTER, CENTER); // 設定文字預設為水平與垂直置中。
  rectMode(CORNER); // 設定矩形以左上角座標繪製。
  imageMode(CORNER); // 設定圖片以左上角座標繪製。
} // 完成畫布初始化。

// 每一幀重新繪製背景與目前的測驗頁面。
function draw() { // 開始繪製當前畫面。
  background("#ffc8dd"); // 使用指定的粉色填滿整個畫布。
  buttons = []; // 清除上一幀的按鈕區域資料。
  optionAreas = []; // 清除上一幀的答案選項區域資料。
  drawBackgroundDecorations(); // 繪製背景裝飾圖形。
  if (currentScreen === "start") { // 判斷目前是否為開始頁。
    drawStartScreen(); // 繪製測驗首頁。
  } else if (currentScreen === "quiz") { // 判斷目前是否為答題頁。
    drawQuizScreen(); // 繪製題目與選項。
  } else { // 處理測驗完成後的結果頁。
    drawResultScreen(); // 繪製成績與稱號。
  } // 完成頁面狀態判斷。
} // 完成每幀繪製函式。

// 在視窗尺寸改變時同步調整畫布尺寸。
function windowResized() { // 開始處理視窗尺寸改變。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為最新視窗大小。
} // 完成視窗調整處理。

// 繪製低調的點狀裝飾，維持粉色主題與畫面層次。
function drawBackgroundDecorations() { // 開始繪製背景裝飾。
  noStroke(); // 移除裝飾圓點的外框。
  fill(255, 255, 255, 90); // 設定裝飾圓點為半透明白色。
  circle(width * 0.08, height * 0.18, 12); // 繪製左上方的小圓點。
  circle(width * 0.91, height * 0.23, 18); // 繪製右上方的小圓點。
  circle(width * 0.12, height * 0.82, 20); // 繪製左下方的小圓點。
  circle(width * 0.89, height * 0.78, 11); // 繪製右下方的小圓點。
  fill(255, 255, 255, 55); // 改用較淡的白色裝飾。
  circle(width * 0.78, height * 0.09, 8); // 繪製右上角的小點綴。
  circle(width * 0.21, height * 0.11, 7); // 繪製左上角的小點綴。
} // 完成背景裝飾繪製。

// 繪製首頁標題、測驗簡介與開始按鈕。
function drawStartScreen() { // 開始繪製首頁。
  const contentWidth = min(width - 40, 760); // 計算首頁內容的最大寬度。
  const centerX = width / 2; // 計算畫布水平中心點。
  const compact = height < 620; // 判斷是否需要使用較緊湊版面。
  noStroke(); // 移除標題裝飾圓形的邊框。
  fill(255, 255, 255, 105); // 設定標題裝飾圓形的顏色。
  circle(centerX, height * 0.25, compact ? 86 : 112); // 繪製標題上方的圓形裝飾。
  fill("#c9184a"); // 設定圖示的深粉色。
  textSize(compact ? 38 : 48); // 設定首頁圖示尺寸。
  text("味", centerX, height * 0.25); // 繪製代表美食的中文字圖示。
  fill("#6d2932"); // 設定首頁主標題顏色。
  textStyle(BOLD); // 將首頁主標題設為粗體。
  textSize(compact ? 30 : min(48, width * 0.075)); // 根據螢幕大小設定主標題字級。
  text("各國美食大解密", centerX, height * 0.43); // 顯示測驗主標題。
  textStyle(NORMAL); // 將文字樣式恢復為一般字重。
  fill("#7b4653"); // 設定首頁說明文字顏色。
  textSize(compact ? 15 : 18); // 設定首頁說明文字大小。
  drawWrappedText("用六道美味料理，帶你環遊世界！", centerX, height * 0.49, contentWidth, compact ? 21 : 25); // 依畫面寬度換行顯示測驗簡介。
  textSize(compact ? 13 : 15); // 設定題數提示的文字大小。
  fill("#9d6570"); // 設定題數提示的柔和顏色。
  text("準備好了嗎？", centerX, height * 0.6); // 顯示開始前的提示。
  drawButton("開始測驗", centerX - min(contentWidth * 0.32, 145), height * 0.68, min(contentWidth * 0.64, 290), compact ? 54 : 62, "start", "#c9184a"); // 繪製首頁開始按鈕。
  fill("#9d6570"); // 設定頁尾小字顏色。
  textSize(12); // 設定頁尾小字大小。
  drawWrappedText("選出你的答案，看看你是不是異國美食通", centerX, height * 0.82, contentWidth, 18); // 依畫面寬度換行顯示簡短遊玩方式。
} // 完成首頁繪製。

// 繪製題目頁的進度、料理照片、問題、選項與答題回饋。
function drawQuizScreen() { // 開始繪製題目頁。
  const sideMargin = min(28, width * 0.055); // 計算內容左右邊界。
  const cardWidth = min(width - sideMargin * 2, 900); // 計算題目卡片寬度。
  const cardX = (width - cardWidth) / 2; // 計算題目卡片左側位置。
  const cardY = height < 600 ? 52 : 68; // 計算題目卡片頂端位置。
  const cardHeight = height - cardY - 18; // 計算題目卡片可用高度。
  const cardPadding = min(26, cardWidth * 0.055); // 計算卡片內距。
  const imageHeight = min(height * 0.31, cardHeight * 0.34, 270); // 根據畫面高度限制圖片區域。
  const contentX = cardX + cardPadding; // 計算卡片內容左側位置。
  const contentWidth = cardWidth - cardPadding * 2; // 計算卡片內容寬度。
  const question = quizData[currentQuestion]; // 取出目前題目資料。
  drawProgressHeader(cardX, cardWidth, cardY); // 繪製題號與進度條。
  drawRoundedCard(cardX, cardY, cardWidth, cardHeight, 24); // 繪製白色圓角題目卡片。
  drawQuestionImage(question.image, contentX, cardY + cardPadding, contentWidth, imageHeight); // 繪製目前料理照片。
  const questionY = cardY + cardPadding + imageHeight + 16; // 計算題目文字起始位置。
  fill("#462a31"); // 設定題目文字顏色。
  textStyle(BOLD); // 將題目設為粗體。
  textSize(width < 500 ? 16 : 19); // 根據裝置寬度設定題目字級。
  const questionHeight = drawWrappedText(question.question, width / 2, questionY, contentWidth, width < 500 ? 23 : 27); // 換行繪製題目並取得實際高度。
  textStyle(NORMAL); // 將題目文字樣式恢復為一般字重。
  drawAnswerOptions(question, contentX, questionY + questionHeight + 13, contentWidth); // 繪製四個作答選項。
  if (selectedOption !== -1) { // 判斷是否已經回答目前題目。
    drawAnswerFeedback(question, cardX, cardY, cardWidth, cardHeight, cardPadding); // 顯示作答結果與解說。
  } // 完成答題回饋狀態判斷。
} // 完成題目頁繪製。

// 繪製目前題號與整體答題進度。
function drawProgressHeader(cardX, cardWidth, cardY) { // 開始繪製題目進度。
  fill("#6d2932"); // 設定進度標籤顏色。
  textSize(14); // 設定進度標籤字級。
  textStyle(BOLD); // 將進度標籤設為粗體。
  text(`美食挑戰　${currentQuestion + 1} / ${quizData.length}`, width / 2, cardY / 2); // 顯示目前題號與總題數。
  textStyle(NORMAL); // 將進度標籤恢復一般字重。
  const barWidth = min(cardWidth, 240); // 計算進度條寬度。
  const barX = width / 2 - barWidth / 2; // 計算進度條起始位置。
  const barY = cardY - 9; // 計算進度條垂直位置。
  noStroke(); // 移除進度條外框。
  fill(255, 255, 255, 145); // 設定進度條底色。
  rect(barX, barY, barWidth, 5, 5); // 繪製進度條底軌。
  fill("#c9184a"); // 設定已完成進度的顏色。
  rect(barX, barY, barWidth * ((currentQuestion + 1) / quizData.length), 5, 5); // 繪製目前答題進度。
} // 完成進度標頭繪製。

// 繪製具有柔和陰影與白色底色的圓角卡片。
function drawRoundedCard(x, y, cardWidth, cardHeight, radius) { // 開始繪製圓角卡片。
  noStroke(); // 移除卡片外框。
  fill(115, 49, 66, 30); // 設定卡片陰影顏色。
  rect(x, y + 5, cardWidth, cardHeight, radius); // 繪製卡片下方柔和陰影。
  fill("#fffafc"); // 設定卡片底色。
  rect(x, y, cardWidth, cardHeight, radius); // 繪製白色圓角卡片。
} // 完成卡片繪製。

// 保持料理圖片比例並將圖片置中裁切至指定區域。
function drawQuestionImage(foodImage, x, y, imageWidth, imageHeight) { // 開始繪製題目圖片。
  if (!foodImage || foodImage.width === 0 || foodImage.height === 0) { // 檢查圖片是否成功載入。
    fill("#f8e5eb"); // 設定圖片載入失敗時的底色。
    noStroke(); // 移除圖片佔位區的外框。
    rect(x, y, imageWidth, imageHeight, 16); // 繪製圖片佔位區。
    fill("#9d6570"); // 設定圖片載入提示顏色。
    textSize(15); // 設定圖片載入提示字級。
    text("料理圖片載入中…", x + imageWidth / 2, y + imageHeight / 2); // 顯示圖片載入提示。
    return; // 結束圖片繪製，避免使用無效圖片。
  } // 完成圖片有效性檢查。
  const imageRatio = foodImage.width / foodImage.height; // 計算圖片原始長寬比例。
  const areaRatio = imageWidth / imageHeight; // 計算圖片區域長寬比例。
  let sourceX = 0; // 初始化圖片裁切區域的水平起點。
  let sourceY = 0; // 初始化圖片裁切區域的垂直起點。
  let sourceWidth = foodImage.width; // 初始化圖片裁切區域的寬度。
  let sourceHeight = foodImage.height; // 初始化圖片裁切區域的高度。
  if (imageRatio > areaRatio) { // 判斷圖片是否比顯示區域更寬。
    sourceWidth = foodImage.height * areaRatio; // 依顯示區域比例縮小來源寬度。
    sourceX = (foodImage.width - sourceWidth) / 2; // 將圖片來源裁切位置置中。
  } else { // 處理圖片比顯示區域更高的情況。
    sourceHeight = foodImage.width / areaRatio; // 依顯示區域比例縮小來源高度。
    sourceY = (foodImage.height - sourceHeight) / 2; // 將圖片來源裁切位置置中。
  } // 完成圖片裁切比例判斷。
  image(foodImage, x, y, imageWidth, imageHeight, sourceX, sourceY, sourceWidth, sourceHeight); // 以置中裁切方式繪製料理圖片。
} // 完成題目圖片繪製。

// 以兩欄排列答案選項，並用指定顏色標示作答結果。
function drawAnswerOptions(question, x, y, contentWidth) { // 開始繪製答案選項。
  const gap = 12; // 設定選項之間的間距。
  const optionWidth = (contentWidth - gap) / 2; // 計算每個答案選項的寬度。
  const optionHeight = height < 650 ? 46 : 52; // 根據畫面高度設定選項按鈕高度。
  optionAreas = []; // 建立本題全新的選項點擊區。
  for (let i = 0; i < question.options.length; i++) { // 依序繪製每個答案選項。
    const column = i % 2; // 計算選項所在欄位。
    const row = floor(i / 2); // 計算選項所在列數。
    const optionX = x + column * (optionWidth + gap); // 計算選項水平位置。
    const optionY = y + row * (optionHeight + 10); // 計算選項垂直位置。
    let optionColor = "#fff0f4"; // 設定尚未作答選項的預設顏色。
    let textColor = "#6d2932"; // 設定尚未作答選項的預設文字顏色。
    if (selectedOption !== -1 && question.options[i] === question.answer) { // 判斷選項是否為正確答案。
      optionColor = "#80ed99"; // 使用指定綠色標示正確答案。
      textColor = "#205b32"; // 使用深綠色確保正確答案文字清楚。
    } else if (selectedOption === i && !isAnswerCorrect) { // 判斷目前選取的答案是否答錯。
      optionColor = "#ce4257"; // 使用指定紅色標示錯誤選項。
      textColor = "#ffffff"; // 使用白色文字提高錯誤選項對比。
    } // 完成答案選項顏色判斷。
    const isHovered = selectedOption === -1 && isInside(optionX, optionY, optionWidth, optionHeight); // 判斷游標是否停留在可作答選項上。
    noStroke(); // 移除答案選項外框。
    fill(optionColor); // 設定答案選項按鈕顏色。
    rect(optionX, optionY, optionWidth, optionHeight, 14); // 繪製圓角答案選項按鈕。
    if (isHovered) { // 判斷是否需要繪製游標懸停外框。
      noFill(); // 設定懸停外框為透明填色。
      stroke("#c9184a"); // 設定懸停外框顏色。
      strokeWeight(2); // 設定懸停外框線寬。
      rect(optionX, optionY, optionWidth, optionHeight, 14); // 繪製答案選項懸停外框。
      noStroke(); // 完成外框後恢復無外框狀態。
    } // 完成答案選項懸停外框判斷。
    fill(textColor); // 設定答案選項文字顏色。
    textStyle(BOLD); // 將答案選項文字設為粗體。
    textSize(width < 500 ? 15 : 17); // 根據裝置寬度調整選項字級。
    text(`${String.fromCharCode(65 + i)}　${question.options[i]}`, optionX + optionWidth / 2, optionY + optionHeight / 2); // 繪製選項代號與內容。
    textStyle(NORMAL); // 將選項文字恢復一般字重。
    optionAreas.push({ x: optionX, y: optionY, w: optionWidth, h: optionHeight, index: i }); // 記錄選項的點擊範圍。
  } // 完成所有答案選項繪製。
} // 完成答案選項區繪製。

// 在作答後顯示正確或錯誤提示、解說與下一步按鈕。
function drawAnswerFeedback(question, cardX, cardY, cardWidth, cardHeight, cardPadding) { // 開始繪製答題回饋。
  const feedbackY = min(height - 104, cardY + cardHeight - (height < 650 ? 116 : 126)); // 計算回饋區域的垂直位置。
  const feedbackX = cardX + cardPadding; // 計算回饋區域左側位置。
  const feedbackWidth = cardWidth - cardPadding * 2; // 計算回饋區域寬度。
  fill(isAnswerCorrect ? "#287a42" : "#b52f45"); // 依照答題結果設定提示文字顏色。
  textStyle(BOLD); // 將答題結果提示設為粗體。
  textSize(width < 500 ? 16 : 18); // 根據裝置寬度設定提示字級。
  text(isAnswerCorrect ? "答對了！太厲害了！" : `再加油，正確答案是「${question.answer}」`, width / 2, feedbackY); // 顯示答題正誤與正確答案。
  textStyle(NORMAL); // 將回饋文字恢復一般字重。
  fill("#68464d"); // 設定料理解說文字顏色。
  textSize(width < 500 ? 12 : 14); // 根據裝置寬度設定解說字級。
  const explanationY = feedbackY + 18; // 計算解說文字起始位置。
  drawWrappedText(question.explanation, width / 2, explanationY, feedbackWidth, width < 500 ? 17 : 20); // 換行繪製目前料理的解說。
  const buttonWidth = min(feedbackWidth, 250); // 計算繼續按鈕寬度。
  const buttonHeight = height < 650 ? 43 : 48; // 根據畫面高度設定繼續按鈕高度。
  const buttonY = cardY + cardHeight - cardPadding - buttonHeight; // 計算繼續按鈕的垂直位置。
  const buttonLabel = currentQuestion === quizData.length - 1 ? "查看測驗結果" : "下一題"; // 決定繼續按鈕的文字。
  drawButton(buttonLabel, width / 2 - buttonWidth / 2, buttonY, buttonWidth, buttonHeight, "continue", "#c9184a"); // 繪製下一題或結果頁按鈕。
} // 完成答題回饋繪製。

// 繪製測驗完成頁並依答對題數提供對應稱號。
function drawResultScreen() { // 開始繪製測驗結果頁。
  const cardWidth = min(width - 40, 680); // 計算結果卡片寬度。
  const cardHeight = min(height - 48, 560); // 計算結果卡片高度。
  const cardX = (width - cardWidth) / 2; // 計算結果卡片左側位置。
  const cardY = (height - cardHeight) / 2; // 計算結果卡片頂端位置。
  const title = getResultTitle(); // 取得依分數決定的專屬稱號。
  drawRoundedCard(cardX, cardY, cardWidth, cardHeight, 26); // 繪製結果頁白色圓角卡片。
  noStroke(); // 移除結果圖示外框。
  fill("#ffe4ec"); // 設定結果圖示圓形底色。
  circle(width / 2, cardY + cardHeight * 0.19, min(104, height * 0.15)); // 繪製結果圖示底圓。
  fill("#c9184a"); // 設定結果圖示文字顏色。
  textSize(min(42, height * 0.07)); // 設定結果圖示文字大小。
  text("旅", width / 2, cardY + cardHeight * 0.19); // 繪製代表美食旅行的圖示文字。
  fill("#6d2932"); // 設定結果頁標題顏色。
  textStyle(BOLD); // 將結果標題設為粗體。
  textSize(width < 500 ? 25 : 34); // 根據裝置寬度調整結果標題字級。
  text("美食探索完成！", width / 2, cardY + cardHeight * 0.38); // 顯示測驗完成標題。
  fill("#c9184a"); // 設定得分文字顏色。
  textSize(width < 500 ? 27 : 36); // 根據裝置寬度調整得分字級。
  text(`答對 ${correctCount} / ${quizData.length} 題`, width / 2, cardY + cardHeight * 0.51); // 顯示答對題數。
  fill("#7b4653"); // 設定稱號前綴文字顏色。
  textSize(width < 500 ? 15 : 18); // 根據裝置寬度調整稱號說明字級。
  text("你的專屬稱號是", width / 2, cardY + cardHeight * 0.62); // 顯示稱號引導文字。
  fill("#6d2932"); // 設定稱號文字顏色。
  textSize(width < 500 ? 19 : 24); // 根據裝置寬度調整稱號字級。
  text(title, width / 2, cardY + cardHeight * 0.7); // 顯示依測驗成績取得的稱號。
  textStyle(NORMAL); // 將結果頁文字恢復一般字重。
  const buttonWidth = min(cardWidth - 48, 290); // 計算重新遊玩按鈕寬度。
  drawButton("再玩一次", width / 2 - buttonWidth / 2, cardY + cardHeight * 0.8, buttonWidth, 54, "restart", "#c9184a"); // 繪製重新開始按鈕。
} // 完成結果頁繪製。

// 依照答對題數回傳適合的美食旅行稱號。
function getResultTitle() { // 開始判斷最終稱號。
  if (correctCount === quizData.length) { // 判斷是否答對全部題目。
    return "異國美食大導遊"; // 回傳全對稱號。
  } // 完成全對稱號判斷。
  if (correctCount >= 4) { // 判斷是否答對至少四題。
    return "潛力無限小吃貨"; // 回傳表現優秀稱號。
  } // 完成中高分稱號判斷。
  return "準備出國增廣見聞"; // 回傳鼓勵探索的稱號。
} // 完成稱號判斷函式。

// 繪製共用的圓角按鈕並記錄它的點擊範圍。
function drawButton(label, x, y, buttonWidth, buttonHeight, action, baseColor) { // 開始繪製互動按鈕。
  const isHovered = isInside(x, y, buttonWidth, buttonHeight); // 判斷滑鼠或觸控指標是否位於按鈕上。
  noStroke(); // 移除按鈕外框。
  fill(115, 49, 66, 32); // 設定按鈕陰影顏色。
  rect(x, y + 3, buttonWidth, buttonHeight, 16); // 繪製按鈕下方陰影。
  fill(isHovered ? "#a90f3c" : baseColor); // 根據游標狀態設定按鈕底色。
  rect(x, y, buttonWidth, buttonHeight, 16); // 繪製圓角按鈕。
  fill("#ffffff"); // 設定按鈕文字為白色。
  textStyle(BOLD); // 將按鈕文字設為粗體。
  textSize(16); // 設定按鈕文字大小。
  text(label, x + buttonWidth / 2, y + buttonHeight / 2); // 將按鈕文字置中繪製。
  textStyle(NORMAL); // 將按鈕文字恢復一般字重。
  buttons.push({ x: x, y: y, w: buttonWidth, h: buttonHeight, action: action }); // 記錄按鈕點擊範圍與動作。
} // 完成共用按鈕繪製。

// 依照可用寬度將中文內容換行並回傳文字總高度。
function drawWrappedText(content, centerX, startY, maxWidth, lineHeight) { // 開始換行繪製文字。
  const lines = []; // 建立待繪製文字行清單。
  let currentLine = ""; // 建立目前累積中的文字行。
  for (const character of content) { // 逐字檢查文字寬度。
    const candidateLine = currentLine + character; // 建立加入下一字後的候選文字。
    if (currentLine !== "" && textWidth(candidateLine) > maxWidth) { // 判斷候選文字是否超過行寬。
      lines.push(currentLine); // 將已完成的文字行加入清單。
      currentLine = character; // 使用超出行寬的文字開始新行。
    } else { // 處理目前文字仍可放入同一行的情況。
      currentLine = candidateLine; // 將文字加入目前行。
    } // 完成文字換行判斷。
  } // 完成逐字換行處理。
  if (currentLine !== "") { // 判斷是否仍有未加入清單的文字。
    lines.push(currentLine); // 將最後一行文字加入清單。
  } // 完成最後一行文字處理。
  textAlign(CENTER, TOP); // 將段落文字設定為頂端置中。
  for (let i = 0; i < lines.length; i++) { // 依序繪製每一行文字。
    text(lines[i], centerX, startY + i * lineHeight); // 依照行距繪製目前文字行。
  } // 完成所有文字行繪製。
  textAlign(CENTER, CENTER); // 將文字對齊方式恢復為畫面預設。
  return lines.length * lineHeight; // 回傳段落實際使用高度。
} // 完成文字換行函式。

// 檢查目前滑鼠或觸控座標是否位於指定矩形內。
function isInside(x, y, areaWidth, areaHeight) { // 開始檢查指標位置。
  return mouseX >= x && mouseX <= x + areaWidth && mouseY >= y && mouseY <= y + areaHeight; // 回傳指標是否位於指定範圍。
} // 完成指標範圍檢查。

// 處理首頁開始、答案選擇、題目切換與重新遊玩的點擊行為。
function mousePressed() { // 開始處理畫布點擊事件。
  if (currentScreen === "quiz" && selectedOption === -1) { // 判斷目前是否正在等待答案。
    for (const area of optionAreas) { // 逐一檢查答案選項點擊範圍。
      if (isInside(area.x, area.y, area.w, area.h)) { // 判斷點擊位置是否落在答案選項上。
        selectAnswer(area.index); // 記錄玩家選取的答案。
        return false; // 停止繼續檢查其他點擊區。
      } // 完成答案選項命中判斷。
    } // 完成所有選項點擊檢查。
  } // 完成答案選項互動判斷。
  for (const button of buttons) { // 逐一檢查目前畫面的按鈕區域。
    if (isInside(button.x, button.y, button.w, button.h)) { // 判斷點擊位置是否落在按鈕上。
      handleButtonAction(button.action); // 執行命中的按鈕動作。
      return false; // 停止繼續檢查其他按鈕。
    } // 完成按鈕命中判斷。
  } // 完成所有按鈕點擊檢查。
  return false; // 阻止瀏覽器對畫布點擊執行預設動作。
} // 完成畫布點擊處理。

// 記錄作答答案並更新正確題數。
function selectAnswer(optionIndex) { // 開始記錄玩家作答。
  selectedOption = optionIndex; // 儲存玩家選取的答案索引。
  isAnswerCorrect = quizData[currentQuestion].options[optionIndex] === quizData[currentQuestion].answer; // 比對玩家答案與正確答案。
  if (isAnswerCorrect) { // 判斷玩家是否答對。
    correctCount += 1; // 將答對題數增加一題。
  } // 完成正確答案計分。
} // 完成作答記錄。

// 依照按鈕動作切換頁面或進入下一題。
function handleButtonAction(action) { // 開始處理按鈕動作。
  if (action === "start") { // 判斷是否點擊開始測驗。
    resetQuiz(); // 初始化全新測驗狀態。
    currentScreen = "quiz"; // 切換到第一題。
  } else if (action === "continue") { // 判斷是否點擊下一步。
    if (currentQuestion === quizData.length - 1) { // 判斷目前是否已完成最後一題。
      currentScreen = "result"; // 切換到測驗結果頁。
    } else { // 處理仍有下一題的情況。
      currentQuestion += 1; // 前往下一道題目。
      selectedOption = -1; // 清除上一題的選項紀錄。
      isAnswerCorrect = false; // 重設上一題的答題結果。
    } // 完成下一步頁面判斷。
  } else if (action === "restart") { // 判斷是否點擊再玩一次。
    resetQuiz(); // 清除上一輪的所有答題資料。
    currentScreen = "start"; // 返回測驗首頁。
  } // 完成按鈕動作判斷。
} // 完成按鈕動作處理。

// 將測驗分數、題號與答題狀態重設為初始值。
function resetQuiz() { // 開始重設測驗狀態。
  currentQuestion = 0; // 將題號重設為第一題。
  selectedOption = -1; // 清除已選取的答案。
  correctCount = 0; // 將答對題數歸零。
  isAnswerCorrect = false; // 清除目前題目的答題結果。
} // 完成測驗狀態重設。