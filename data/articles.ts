// data/articles.ts

// ==========================================
// 第1套 Passage One：熊猫保护 (Biology/Conservation)
// ==========================================
const articleSet1Passage1 = {
  id: "2025-06-set1-passage1",
  title: "Pandas at Risk from Comfort?",
  tags: ["Biology", "Conservation"],
  vocab: [
    { word: "fragmentation", phonetic: "/ˌfræɡmenˈteɪʃn/", cn: "[生态] 破碎化；分裂" },
    { word: "genetic diversity", phonetic: "/dʒəˈnetɪk daɪˈvɜːrsəti/", cn: "遗传多样性" },
    { word: "thrive", phonetic: "/θraɪv/", cn: "繁荣；茁壮成长" },
    { word: "implication", phonetic: "/ˌɪmplɪˈkeɪʃn/", cn: "影响；暗示" },
    { word: "persistence", phonetic: "/pərˈsɪstəns/", cn: "存续；坚持" }
  ],
  content: [
    {
      id: 1,
      en: "New research suggests that pandas may be at risk of dying out because they are too comfortable. Experts say too much happiness can stop the bears from searching for new mates. Environmentalists have long believed that building roads or homes near the bears may threaten their survival by 'reducing or fragmenting their natural habitats', The Times reported. But the new research suggests that a 'modest degree of discomfort and fragmentation' may actually help preserve panda populations.",
      cn: "新的研究表明，熊猫可能因生活得过于舒适而面临灭绝风险。专家称，过度安逸会导致熊猫不再寻觅新配偶。据《泰晤士报》报道，环保主义者长期以来一直认为，在熊猫栖息地附近修建道路或住宅，可能会通过“减少或割裂它们的自然栖息地”威胁它们的生存。但这项新研究指出，“适度的不适与栖息地碎片化”实际上可能有助于保护熊猫种群。"
    },
    {
      id: 2,
      en: "The research was conducted by scientists from Michigan State University. It concluded that pandas fail to wander off in search of new mates if they find their habitat too comfortable, resulting in a lack of vital genetic diversity. For their study—outlined in a paper in the journal Conservation Biology—the team looked at genetic diversity and spread among a Chinese panda population. The ideal level of perfectly livable habitat was found to be only 80% of an area, with the remainder either too harsh or too affected by human activity.",
      cn: "这项研究是由密歇根州立大学的科学家们开展的。研究得出结论：若熊猫发现栖息地过于舒适，它们就不会迁徙寻找新配偶，从而导致关键的遗传多样性缺失。研究团队在《保护生物学》期刊的一篇论文中概述了此项研究：他们考察了中国一个熊猫种群的遗传多样性与分布情况。结果发现，理想状态下适宜生存的栖息地面积应占总面积的 80%，其余部分要么环境过于恶劣，要么受到人类活动的影响过大。"
    },
    {
      id: 3,
      en: "The experts concluded that pandas should ideally 'be happy enough to thrive, but not so content that they don't want to move around and find new mates'. Their conclusions about what The Guardian described as this 'sweet spot' are in line with the so-called Goldilocks principle: that there can be just the right amount of something. The concept has been applied to a wide range of disciplines, from developmental psychology to economics and engineering.",
      cn: "专家总结道，熊猫的生存状态理想情况下应该是“舒适到足以繁衍，但又不至于安于现状而不愿迁徙寻觅新的配偶”。《卫报》将这一结论称为“最佳平衡点”，与所谓的“金发姑娘原则”不谋而合：凡事都存在一个恰到好处的程度。这一概念已被广泛应用于从发展心理学到经济学、工程学等诸多领域。"
    },
    {
      id: 4,
      en: "Claudio Sillero, a professor of conservation biology at Oxford University, told the newspaper that the new findings could have implications beyond panda conservation. 'Most large animals that eat meat live in increasingly fragmented landscapes,' said Sillero, who was not involved in the research. 'It may well be that the messy nature of their relationship with human efforts induces more animals to scatter or travel further, and might result in greater genetic connectivity and enhanced population persistence.' The most recent count of pandas found that there were more than 1,800 left in the wild, putting them on the list of vulnerable, but not endangered, species.",
      cn: "牛津大学保护生物学教授克劳迪奥·西莱罗向该报表示，这项新发现的影响范围不止在熊猫保护领域。“大多数大型肉食动物都生活在日益碎片化的环境中，”未参与此项研究的西莱罗说道。“它们与人类保护活动之间错综复杂的关系，很可能会促使更多动物分散或迁徙到更远区域，从而可能提升遗传连通性并增强种群存续能力。”最新的熊猫数量统计显示，现存野生熊猫数量逾 1800 只，这使它们被列入易危而非濒危物种名单。"
    }
  ],
  quiz: [
    {
      id: 46,
      question: "What do we learn from new research about pandas?",
      options: [
        { id: "A", text: "They are losing habitat due to the building of roads and houses." },
        { id: "B", text: "They have stopped seeking new mates for reproduction." },
        { id: "C", text: "They may not adapt to the fragmentation of their habitat." },
        { id: "D", text: "They may cease to exist as a result of enjoying too good a life." }
      ],
      correctId: "D",
      analysis: "文章首句明确指出 'pandas may be at risk of dying out because they are too comfortable'。D选项 'enjoying too good a life' 对应原文的 'too comfortable'，'cease to exist' 对应 'dying out'。A是旧观点；B太绝对；C与新研究相反。"
    },
    {
      id: 47,
      question: "What can we conclude from the new research by scientists at Michigan State University?",
      options: [
        { id: "A", text: "Environmentalists' long-time belief regarding panda conservation may be misleading." },
        { id: "B", text: "Housing development near pandas' homes may threaten their survival." },
        { id: "C", text: "Pandas' natural habitats are becoming less suitable for reproduction." },
        { id: "D", text: "The increased panda population is attributed to the fragmentation of their habitat." }
      ],
      correctId: "A",
      analysis: "文章第二段提到环保主义者长期认为修路建房威胁熊猫生存，但（But）新研究指出'适度的不适'反而有益。这暗示了旧有的观念可能存在误导性。"
    },
    {
      id: 48,
      question: "What is the experts' conclusion regarding pandas?",
      options: [
        { id: "A", text: "It is urgent to provide an ideal habitat for them to thrive." },
        { id: "B", text: "It is very important to preserve their genetic diversity." },
        { id: "C", text: "Their chances of finding new mates have a lot to do with their habitat." },
        { id: "D", text: "Their environment for survival has been continuously worsening." }
      ],
      correctId: "C",
      analysis: "文章第三段指出，如果栖息地太舒适，熊猫就不愿迁徙寻找配偶，导致基因多样性缺失。这说明寻找配偶的机会与栖息地环境密切相关。"
    },
    {
      id: 49,
      question: "What can we infer from the passage about the Goldilocks principle?",
      options: [
        { id: "A", text: "It needs to be confirmed by more studies on pandas." },
        { id: "B", text: "It applies to the preservation of pandas too." },
        { id: "C", text: "It has implications for future panda research." },
        { id: "D", text: "It can be used to locate the right spot for pandas." }
      ],
      correctId: "B",
      analysis: "专家关于熊猫'舒适度要适中'的结论符合'金发姑娘原则'。既然该原则与熊猫研究结论一致，说明它适用于熊猫保护。"
    },
    {
      id: 50,
      question: "What can the new findings do according to Professor Sillero?",
      options: [
        { id: "A", text: "Help discover new ways for the conservation of pandas." },
        { id: "B", text: "Help remove pandas from the list of endangered species." },
        { id: "C", text: "Shed light on the conservation of most large meat-eating animals." },
        { id: "D", text: "Show the complexity of interactions between humans and animals." }
      ],
      correctId: "C",
      analysis: "Sillero 教授提到新发现的影响 'beyond panda conservation'，并指出 'Most large animals that eat meat...'。这意味着新发现对其他大型食肉动物的保护也有启示。"
    }
  ]
};

// ==========================================
// 第1套 Passage Two：坚毅的力量 (Psychology/Self-Growth)
// ==========================================
const articleSet1Passage2 = {
  id: "2025-06-set1-passage2",
  title: "Is Talent Overrated? The Power of Grit",
  tags: ["Psychology", "Self-Growth"],
  vocab: [
    { word: "excel", phonetic: "/ɪkˈsel/", cn: "胜过；擅长" },
    { word: "overrated", phonetic: "/ˌəʊvəˈreɪtɪd/", cn: "被高估的" },
    { word: "burden", phonetic: "/ˈbɜːrdn/", cn: "使负重；使烦恼" },
    { word: "redefine", phonetic: "/ˌriːdɪˈfaɪn/", cn: "重新定义" },
    { word: "transform", phonetic: "/trænsˈfɔːrm/", cn: "改变；转化" }
  ],
  content: [
    {
      id: 1,
      en: "With those born with natural talents, it feels as if they excel without really trying. But what about those of us who don't have a natural talent? We've been told all our lives that if you work hard, you too can succeed. But with the release of Angela Duckworth's Grit, we are given a new key to success. \"As much as talent counts, effort counts twice,\" says Duckworth in Grit. She introduces a new concept that talent may be overrated, and if you want real success, what you need is grit, the perfect combination of passion and persistence. Even if you have natural talent, it's nothing without grit.",
      cn: "对于天赋异禀的人而言，他们仿佛无需真正努力就能出类拔萃。但我们当中那些没有天赋的人呢？我们一生都被告知，只要勤奋努力，也能成功。然而，随着安吉拉·达克沃斯所著的《坚毅》一书的问世，我们获得了一把通往成功的新钥匙。“天赋固然重要，努力则更为关键。”达克沃斯在《坚毅》中如此阐释。她提出一个全新观点：天赋或许被高估了，若想获得真正的成功，需要的是坚毅，也就是激情与毅力的完美融合。即便拥有天赋，缺乏坚毅也终将一事无成。"
    },
    {
      id: 2,
      en: "Duckworth says grit is the difference between success and failure. A person who has grit is more likely to succeed than a person who does not. When we think about attaining success—whether it's landing that job or learning that new skill—our thoughts are immediately burdened by all the things we must first learn. If you want that new job, you have to learn the job skills, then the interview skills, then the dress part and you must be perfect at all of them. Grit is different because it tells us that perfection isn't the goal.",
      cn: "达克沃斯指出，坚毅是成败的分水岭。拥有坚毅品质的人，比缺乏者更有可能成功。当我们思考如何获得成功时——无论是争取一份工作，还是学习一项新技能——思绪总会被“必须先掌握的所有知识”压得喘不过气。若想得到那份新工作，就需先学习工作技能，再研习面试技巧，还要讲究着装礼仪——且必须在各方面都做到完美。而坚毅的不同之处在于，它告诉我们：完美并非终极目标。"
    },
    {
      id: 3,
      en: "Grit lifts the unreasonable expectations off our shoulders. Grit tells us that the door is open wider than we first thought possible. Grit allows us to redefine our goals. Think about it: what's something you've always wanted to do, but gave up because you \"don't have the skills for it\"? What's something you love but aren't good at? The real workings of grit are to have sustainable passion and continue to try. Effort means more than your natural ability. Even if you haven't mastered a skill, grit tells you that you can still succeed if you can transform your passion into action. In a way, Duckworth is giving new hope to people who have shut the doors on their dreams. She is saying it is possible that you can accomplish anything. If at first you fail, then try one more time with grit.",
      cn: "坚毅卸下了我们肩头不切实际的期望。它让我们知晓，成功的大门比最初想象中的更为开阔。它更让我们重新思考自己的目标。试想：是否有某件事你一直想做，却因“缺乏相应技能”而放弃？是否有某件事你热爱着，却不够擅长？坚毅的真谛在于怀揣持久的激情并持续尝试。努力的意义远超天赋本身。即便尚未掌握某项技能，坚毅也会告诉你：若能将激情转化为行动，依然可以成功。从某种意义上说，达克沃斯为那些已经对梦想关上大门的人带来了新的希望。她宣告：一切皆有可能。若初次尝试失败，就带着坚毅再试一次。"
    }
  ],
  quiz: [
    {
      id: 51,
      question: "What does the passage say about people born with natural talents?",
      options: [
        { id: "A", text: "They seem to outdo others without hard work." },
        { id: "B", text: "They appear to know all the secrets to success." },
        { id: "C", text: "They feel it only too logical to succeed." },
        { id: "D", text: "They are bound to excel effortlessly." }
      ],
      correctId: "A",
      analysis: "文章首句指出，有天赋的人似乎不用努力就能表现出色。'excel' 对应 'outdo others'，'without really trying' 对应 'without hard work'。D选项 'bound to'（注定）过于绝对。"
    },
    {
      id: 52,
      question: "What does Duckworth say about talent?",
      options: [
        { id: "A", text: "It is a new concept much too overrated." },
        { id: "B", text: "It proves necessary for big achievements." },
        { id: "C", text: "It plays a lesser role in one's success." },
        { id: "D", text: "It is a guarantee for real success in life." }
      ],
      correctId: "C",
      analysis: "第二段引用 Duckworth 的话 'As much as talent counts, effort counts twice'，说明相比努力（grit），天赋扮演的角色较小。A选项 'new concept' 指的是 grit 而不是 talent。"
    },
    {
      id: 53,
      question: "What does the passage say about people thinking of attaining success?",
      options: [
        { id: "A", text: "They are puzzled how to present their best to the employer." },
        { id: "B", text: "They are burdened by their expectation of perfection." },
        { id: "C", text: "They will try hard to land a job that fits their skills best." },
        { id: "D", text: "They will find themselves lacking in all the skills they need." }
      ],
      correctId: "B",
      analysis: "第三段提到，当人们思考成功时，思绪会被 'burdened by all the things we must first learn'，且必须在各个环节 'be perfect'。这表明人们被追求完美（perfection）的期望所累。"
    },
    {
      id: 54,
      question: "How does the author think grit can be helpful to us?",
      options: [
        { id: "A", text: "It allows us to know what we are good at." },
        { id: "B", text: "It opens our eyes to new opportunities." },
        { id: "C", text: "It focuses our attention on what we do." },
        { id: "D", text: "It lets us reconsider the goals to achieve." }
      ],
      correctId: "D",
      analysis: "第四段明确指出 'Grit allows us to redefine our goals'（坚毅让我们重新定义/思考我们的目标）。"
    },
    {
      id: 55,
      question: "What message does Duckworth try to convey in her book Grit?",
      options: [
        { id: "A", text: "We should perfect ourselves to ensure success." },
        { id: "B", text: "We should stay persistent even in face of failures." },
        { id: "C", text: "We can never master a skill without constant practice." },
        { id: "D", text: "We can never expect to reach our goals without passion." }
      ],
      correctId: "B",
      analysis: "文章最后一句 'If at first you fail, then try one more time with grit' 是对全书核心信息的总结，即面对失败要坚持。"
    }
  ]
};

// ==========================================
// 第2套 Passage One：着装心理学 (Psychology/Behavior)
// ==========================================
const articleSet2Passage1 = {
  id: "2025-06-set2-passage1",
  title: "The Hidden Power of What We Wear",
  tags: ["Psychology", "Behavior"],
  vocab: [
    { word: "conflicting", phonetic: "/kənˈflɪktɪŋ/", cn: "冲突的；矛盾的" },
    { word: "extra edge", phonetic: "/ˈekstrə edʒ/", cn: "额外优势" },
    { word: "symbolic", phonetic: "/sɪmˈbɑːlɪk/", cn: "象征的；有象征意义的" },
    { word: "dominance", phonetic: "/ˈdɑːmɪnəns/", cn: "支配地位；优势" },
    { word: "tailored", phonetic: "/ˈteɪlərd/", cn: "定制的；合身的" }
  ],
  content: [
    {
      id: 1,
      en: "We all take a little extra effort to look nice for special occasions. But most of us have conflicting feelings about dressing up and feel guilty about taking the time to focus on clothes. Science now suggests the right dress may give ourselves the extra edge in our professional and personal lives.",
      cn: "我们都会在特殊场合多花一点心思打扮自己。但是，我们中的大多数人都会对穿衣打扮有着矛盾的情感，并对花时间关注衣着感到愧疚。现在的科学表明，合适的着装可能会给我们的职业和个人生活提供额外的优势。"
    },
    {
      id: 2,
      en: "We hear sayings like \"dress for the job you want; not the job you have\". Most people don't really believe in them, but research into the impact of clothes on behavior now suggests that there may actually be a grain of truth in these sayings. Science says that the clothes we wear affect our behavior, our mood and even the way we interact with others because of the symbolic meaning that we assign to different types of clothing.",
      cn: "我们听过诸如此类说法：“为你想要的工作着装，而不是为你现有的工作着装”。大多数人并不真正相信这些话，但有关服装对行为的影响的研究表明，这些说法或许确有几分道理。科学表明，我们的着装会影响我们的行为、情绪，甚至与他人交往的方式，因为我们赋予了不同类型的服装象征性的意义。"
    },
    {
      id: 3,
      en: "We consider some clothes to be powerful, some to be fun, and so on. We even evaluate people whom we have just met based on their clothes. We also evaluate ourselves based on what we are wearing because of the way they make us feel. This means that the experience of wearing something affects our attitudes and our choice of behavior.",
      cn: "我们认为有些衣服是有力量的，有些衣服是有趣的，等等。我们甚至会根据服装来评价初次见面的人。我们也会根据自己的穿着来评价自己，因为它们会影响我们的感觉。这意味着穿某件衣服的体验会影响我们的态度和行为选择。"
    },
    {
      id: 4,
      en: "There's a reason tailored jackets are associated with being 'dressed for success'. It seems that wearing formal office wear puts us in the right frame of mind to conduct business. Wearing power clothing makes us feel more confident and even increases hormones needed for displaying dominance. This in turn helps us become better negotiators and abstract thinkers.",
      cn: "定制夹克与“为成功着装”联系在一起是有原因的。穿着正式的职业装似乎能让我们以正确心态开展业务。穿上力量型服装会让我们感觉更自信，甚至会增加展现支配力所需的荷尔蒙。这反过来又帮助我们成为更好的谈判者和抽象思维者。"
    },
    {
      id: 5,
      en: "While a good suit works wonders for our performance in the boardroom, wearing formal wear isn't a great idea when we want to socialize. Studies have found that people tend to be less open and less able to relax when they wear formal clothes. On the other hand, a casual dress helps us become more friendly and creative. These findings support the idea of wearing business casuals on a Friday; since colleagues are most likely to take out time to socialize on the last work day of the week. I mean, who wants to hang out with people in their suits?",
      cn: "虽然一套好西装能让我们在会议室里表现出色，但当我们想要社交时，穿正装并不是一个好主意。研究发现，人们穿正装时往往没那么放得开，更难放松。另一方面，休闲装能让我们变得更友好、更具创造力。这些发现支持在周五穿商务便装的想法——因为同事们最有可能在一周的最后一个工作日抽出时间来社交。我的意思是，谁会愿意和穿着西装的人一起出去玩呢？"
    }
  ],
  quiz: [
    {
      id: 46,
      question: "What does science suggest the right dress may do?",
      options: [
        { id: "A", text: "Add to our advantage in work and life." },
        { id: "B", text: "Enable us to look a lot more attractive." },
        { id: "C", text: "Help us to enjoy a fuller personal life." },
        { id: "D", text: "Provide extra energy for what we do." }
      ],
      correctId: "A",
      analysis: "第一段最后一句指出，科学表明合适的着装可能会给我们的职业和个人生活提供额外的优势 (give ourselves the extra edge)。选项A中的 Add to our advantage 是 extra edge 的同义替换。"
    },
    {
      id: 47,
      question: "Why does science say the clothes one wears may affect their interaction with others?",
      options: [
        { id: "A", text: "Clothes usually represent one's social and economic status." },
        { id: "B", text: "Clothes largely determine one's likability by people around." },
        { id: "C", text: "Different types of clothing markedly reflect different personalities." },
        { id: "D", text: "Different types of clothing convey different messages symbolically." }
      ],
      correctId: "D",
      analysis: "第二段最后一句指出，着装会影响行为和交往，因为我们赋予了不同类型的服装“象征性的意义” (symbolic meaning)。D选项 accurately reflects this point."
    },
    {
      id: 48,
      question: "How do the clothes we wear sway our evaluation of ourselves?",
      options: [
        { id: "A", text: "By exerting an effect on our power of judgment." },
        { id: "B", text: "By impacting how we feel about ourselves." },
        { id: "C", text: "By affecting what we take as the basis for assessment." },
        { id: "D", text: "By influencing our interpretation of symbolic messages." }
      ],
      correctId: "B",
      analysis: "第三段第三句指出，我们根据穿着评价自己，因为它们会影响我们的“感觉” (the way they make us feel)。B选项直接对应了这一点。"
    },
    {
      id: 49,
      question: "Why does the author say tailored jackets are associated with being 'dressed for success'?",
      options: [
        { id: "A", text: "They are necessary for formal business dealings." },
        { id: "B", text: "They may help people concentrate on their business." },
        { id: "C", text: "They are vital to keeping a dominant position in business transactions." },
        { id: "D", text: "They may enable people to have the right mentality for doing business." }
      ],
      correctId: "D",
      analysis: "第四段第二句指出，穿着正式职业装似乎能让我们以“正确心态” (right frame of mind) 开展业务。D选项的 right mentality 对应 right frame of mind。"
    },
    {
      id: 50,
      question: "What are people advised to do when they want to socialize?",
      options: [
        { id: "A", text: "Focus on clothing." },
        { id: "B", text: "Wear a good suit." },
        { id: "C", text: "Dress casually." },
        { id: "D", text: "Look unusual." }
      ],
      correctId: "C",
      analysis: "文章最后一段指出，穿正装社交不是好主意，而“休闲装” (casual dress) 能让人更友好。因此建议在社交时穿着休闲。"
    }
  ]
};

// ==========================================
// 第2套 Passage Two：古典音乐的现状 (Arts/Culture)
// ==========================================
const articleSet2Passage2 = {
  id: "2025-06-set2-passage2",
  title: "Is Classical Music Still Relevant?",
  tags: ["Arts", "Culture"],
  vocab: [
    { word: "fade away", phonetic: "/feɪd əˈweɪ/", cn: "逐渐消失；淡出" },
    { word: "indicator", phonetic: "/ˈɪndɪkeɪtər/", cn: "标志；迹象" },
    { word: "subtle", phonetic: "/ˈsʌtl/", cn: "不易察觉的；微妙的" },
    { word: "expressive", phonetic: "/ɪkˈspresɪv/", cn: "富于表现力的" },
    { word: "mainstream", phonetic: "/ˈmeɪnstriːm/", cn: "主流的" }
  ],
  content: [
    {
      id: 1,
      en: "With the rise of pop music, jazz, and electronic music, both opera and classical music started to fade away from the public eye. Some people are beginning to wonder whether opera and classical music are still relevant to the modern world of music. Granted, you will not typically see today's teenagers lending their ears to Bach anytime soon, but there are some major indicators that both opera and classical music are now still quite alive.",
      cn: "随着流行音乐、爵士乐和电子音乐的兴起，歌剧和古典音乐都开始淡出公众的视野。有些人开始怀疑，歌剧和古典音乐是否仍与现代音乐世界息息相关。当然，你通常不会看到今天的青少年很快就去聆听巴赫的作品，但有一些重大的迹象表明，歌剧和古典音乐至今仍然充满活力。"
    },
    {
      id: 2,
      en: "The most major indicator of classical music's importance in society today is the fact that much of the popular music that is currently being produced uses similar beats, harmonies, and melodies as those that were used in some of classical music's best works. Even so, it can be difficult for those who do not study music theory to see this as an indicator, since it is subtle and just shows the impact symphonic orchestras have had on society's taste in music.",
      cn: "古典音乐在当今社会中仍具重要性的最主要标志是，目前制作的许多流行音乐都使用了与古典音乐中一些最佳作品相似的节拍、和声和旋律。即便如此，不学习音乐理论的人可能很难将此视为一个标志，因为它很微妙，只是体现了交响乐团对社会音乐品味的影响。"
    },
    {
      id: 3,
      en: "A better example for the relevance of opera and classical music can be seen in the invention of the rock opera. Opera, in its simplest definition, is telling a story using music as its form. The art of telling a story using music has not faded in the least bit. In fact, sometimes actual orchestras are used for major parts of the opera itself. Some of the world's greatest hits have been parts of rock operas.",
      cn: "关于歌剧和古典音乐重要性的一个更好的例子是摇滚歌剧的发明。从最简单的定义看，歌剧就是以音乐为形式讲述故事。用音乐讲故事的艺术丝毫没有衰退。事实上，有时歌剧本身的主要部分会使用真正的管弦乐队。一些世界上最伟大的热门歌曲就出自摇滚歌剧。"
    },
    {
      id: 4,
      en: "Fans of classical music can also tell you that there are few types of music that are more expressive. So, it should come as no surprise to anyone that classical music pieces are still used as background music in modern movies. Symphonic orchestra compositions have also been created solely for the purpose of being included in major motion pictures. These are often very well received amongst mainstream music fans.",
      cn: "古典音乐爱好者也可以告诉你，几乎没有比古典音乐更具表现力的音乐类型了。因此，古典音乐作品仍被用作现代电影的背景音乐也就不足为奇了。交响乐团的作品也是专门为在大型电影中出现而创作的。这些作品往往深受主流音乐爱好者的欢迎。"
    },
    {
      id: 5,
      en: "Classical music and opera are the very foundation of what our modern music is based upon. Considering the huge impact they have had on our current society, it is without doubt that we can expect them to continue to remain important for centuries to come.",
      cn: "古典音乐和歌剧正是现代音乐的基础。考虑到它们对当今社会产生的巨大影响，毫无疑问，我们可以期待它们在未来几个世纪中继续保持重要地位。"
    }
  ],
  quiz: [
    {
      id: 51,
      question: "What does the author think of classical music and opera in today's world?",
      options: [
        { id: "A", text: "They still make their presence felt." },
        { id: "B", text: "They have given way to electronic music." },
        { id: "C", text: "They will not fade away from the public eye." },
        { id: "D", text: "They are no longer relevant to teenagers' lives." }
      ],
      correctId: "A",
      analysis: "文章第一段最后一句指出，有一些重大迹象表明，歌剧和古典音乐至今仍然充满活力 (still quite alive)。A选项 make their presence felt 意为“具有影响力/存在感”，对应 alive。"
    },
    {
      id: 52,
      question: "What do we learn about much of the popular music currently produced?",
      options: [
        { id: "A", text: "It can be difficult for many classical music fans to appreciate." },
        { id: "B", text: "It can be seen as an indicator of refinement on classical music." },
        { id: "C", text: "It caters to society's taste in music in a more subtle way than classical music." },
        { id: "D", text: "It contains elements similar to those in some masterpieces of classical music." }
      ],
      correctId: "D",
      analysis: "第二段第一句指出，当前许多流行音乐使用了与古典音乐杰作相似的节拍、和声和旋律。D选项 perfectly matches this description."
    },
    {
      id: 53,
      question: "Why does the author mention the invention of the rock opera?",
      options: [
        { id: "A", text: "To illustrate how to tell a story using music." },
        { id: "B", text: "To present the simplest definition of opera." },
        { id: "C", text: "To show the relevance of opera and classical music." },
        { id: "D", text: "To justify the necessity of using orchestras in opera." }
      ],
      correctId: "C",
      analysis: "第三段第一句明确指出，摇滚歌剧的发明是歌剧和古典音乐重要性（relevance）的一个更好例子。故选C。"
    },
    {
      id: 54,
      question: "Why are classical music pieces still used as background music in modern movies?",
      options: [
        { id: "A", text: "There are few types of music for movie producers to choose from." },
        { id: "B", text: "They are considered to be the most expressive type of music." },
        { id: "C", text: "They are well received by movie fans from all over the world." },
        { id: "D", text: "They are essential for movies to become the world's greatest hits." }
      ],
      correctId: "B",
      analysis: "第四段指出，几乎没有比古典音乐更具表现力 (more expressive) 的音乐类型了，因此它被用作电影背景音乐。B选项符合原文。"
    },
    {
      id: 55,
      question: "What do we learn about our modern music?",
      options: [
        { id: "A", text: "It could not have come into being without classical music and opera as its foundation." },
        { id: "B", text: "It cannot outcompete classical music and opera in its impact on our current society." },
        { id: "C", text: "It will not enjoy as much popularity as classical music and opera among music fans." },
        { id: "D", text: "It might not be able to rival classical music and opera in importance for centuries to come." }
      ],
      correctId: "A",
      analysis: "文章最后一段第一句指出，古典音乐和歌剧是现代音乐的基础 (foundation)。A选项正确地表述了这种依赖关系。"
    }
  ]
};

// ==========================================
// 第3套 Passage One：外在美的陷阱 (Psychology/Society)
// ==========================================
const articleSet3Passage1 = {
  id: "2025-06-set3-passage1",
  title: "The Trap of Outer Beauty",
  tags: ["Psychology", "Society"],
  vocab: [
    { word: "excessive", phonetic: "/ɪkˈsesɪv/", cn: "过分的；过度的" },
    { word: "soulful", phonetic: "/ˈsoʊlfl/", cn: "深情的；灵魂的" },
    { word: "resentment", phonetic: "/rɪˈzentmənt/", cn: "愤恨；怨恨" },
    { word: "authentic", phonetic: "/ɔːˈθentɪk/", cn: "真正的；真实的" },
    { word: "compatible", phonetic: "/kəmˈpætəbl/", cn: "兼容的；和睦相处的" }
  ],
  content: [
    {
      id: 1,
      en: "Our society places a high value on physical beauty. Americans spend an average of over $722 each year on their appearance. One in ten Americans has tried to look like a star. There's nothing wrong with trying to look our best, but excessive focus on physical appearance misses the soulful aspects of what it means to be beautiful. Trying to look like the magazine pictures can take us on a long ride away from what beauty is really about.",
      cn: "我们的社会高度重视外在美。美国人平均每年在外表上的花费超过722美元。十分之一的美国人曾试图模仿明星的造型。努力展现最佳形象本无可厚非，但过度关注外貌会让我们忽略“美”的灵魂层面。盲目追逐杂志上的完美形象，只会让我们与美的真谛渐行渐远。"
    },
    {
      id: 2,
      en: "Many of us spend far too much time, energy, and money trying to polish an image of what we think will bring attention, love, and connection. In the process, we may fail to attend to ourselves in a way that would move us toward deeper intimacy, fulfillment, and meaning. It may sound trite, but beauty is only skin deep; it's not what brings love toward us. Just read about the latest Hollywood starlets whose seeming love turns into resentment and bitter court battles.",
      cn: "我们很多人耗费了过多的时间、精力和金钱精心雕琢外在形象，以为这样就能获得关注、爱与联结。在这一过程中，我们可能没能以一种能让我们走向更深层次的亲密关系、获得满足感和人生意义的方式呵护自己。这话听起来或许老生常谈，但美貌不过是肤浅的表象，真正能吸引爱意的并非外表。只要看看好莱坞新秀女演员的新闻就知道了——她们看似美好的爱情最终都沦为怨恨与激烈的法庭纷争。"
    },
    {
      id: 3,
      en: "Outer beauty can be as much of a curse as a blessing. We may develop a habit of being so focused on maintaining a perfect appearance that we never cultivate the inner qualities necessary to sustain and deepen intimacy and connection. As I describe in my book, The Authentic Heart, it is the courage to be authentic that connects us in a deeper way.",
      cn: "外在美可能福祸并存。我们可能养成一种习惯，过分执着于保持完美外表，却从未培养维系并深化亲密关系所需的内在品质。正如我在《真实之心》一书中所言：唯有勇于展现真我，方能建立更深层次的心灵联结。"
    },
    {
      id: 4,
      en: "While our initial attraction may be based, in part, on physical chemistry, it is the meeting of our inner worlds that creates the lasting intimacy and spiritual connection for which we long. If we redirect our attention toward cultivating inner qualities, we might find a magnetic attraction that moves us from something superficial to something that connects us to our depths.",
      cn: "虽然最初的吸引可能部分源于我们身体本能的化学反应，但真正造就我们渴望的那种持久亲密与心灵相通的，是内心世界的相遇相知。如果我们将注意力转向内在品质的培养，或许会发现一种磁石般的吸引力——它能将我们从肤浅的关系，引向直达灵魂深处的联结。"
    },
    {
      id: 5,
      en: "The path toward cultivating inner beauty is really simple. But what is simple is not always easy. Not everyone will see us and appreciate us as we take the courageous risk to allow ourselves to be seen as we really are. But if they don't, it is their loss, not ours. Eventually we'll find those compatible souls who appreciate us as we are.",
      cn: "培养内在美的途径其实很简单，但简单的事未必容易。当我们鼓起勇气展现真实自我时，并非每个人都会看见并欣赏这样的我们。但如果他们不懂得欣赏，那是他们的损失，而非我们的。终有一天，我们会遇见那些与我们灵魂相契、能欣赏我们本来模样的人。"
    }
  ],
  quiz: [
    {
      id: 46,
      question: "What do we learn about American society from the first paragraph?",
      options: [
        { id: "A", text: "It sees lots of personal income wasted on beauty products." },
        { id: "B", text: "It considers one's physical appearance very important." },
        { id: "C", text: "It places a high value on the physical fitness of stars." },
        { id: "D", text: "It expects every individual to look their very best." }
      ],
      correctId: "B",
      analysis: "第一段首句指出 Our society places a high value on physical beauty，并列举了美国人在外表上的花费。这说明社会认为外貌非常重要 (very important)。"
    },
    {
      id: 47,
      question: "What happens when people strive to look better?",
      options: [
        { id: "A", text: "They have to get prepared for resentment and bitter court battles." },
        { id: "B", text: "They are better able to gain attention, love, and personal connection." },
        { id: "C", text: "They may neglect to cultivate the inner qualities that matter more." },
        { id: "D", text: "They feel much of their precious time, energy and resources is wasted." }
      ],
      correctId: "C",
      analysis: "第二、三段指出，过度关注外貌会让人们忽略“美”的灵魂层面，可能从未培养维系亲密关系所需的内在品质 (inner qualities)。C选项符合原文。"
    },
    {
      id: 48,
      question: "What does the author say about outer beauty?",
      options: [
        { id: "A", text: "It may be inherited or cultivated." },
        { id: "B", text: "It may lead to bad as well as good habits." },
        { id: "C", text: "It may create connection or isolation." },
        { id: "D", text: "It may do as much harm as good." }
      ],
      correctId: "D",
      analysis: "第三段首句指出 Outer beauty can be as much of a curse as a blessing（外在美可能福祸并存）。D选项（弊与利一样多）是这句话的同义改写。"
    },
    {
      id: 49,
      question: "What brings about spiritual connection?",
      options: [
        { id: "A", text: "Meeting of minds." },
        { id: "B", text: "Attraction at first sight." },
        { id: "C", text: "Physical chemistry." },
        { id: "D", text: "Frequent interaction." }
      ],
      correctId: "A",
      analysis: "第四段指出，真正造就持久亲密与心灵相通的，是内心世界的相遇相知 (meeting of our inner worlds)。A选项 Meeting of minds 意为心灵契合，最为接近。"
    },
    {
      id: 50,
      question: "What happens when we take the path toward cultivating inner beauty?",
      options: [
        { id: "A", text: "We may find a route toward other people's souls." },
        { id: "B", text: "We may be appreciated more by people around us." },
        { id: "C", text: "We will meet people who value us for who we are." },
        { id: "D", text: "We will be discouraged from revealing our true selves." }
      ],
      correctId: "C",
      analysis: "最后一段指出，终有一天我们会遇见那些与我们灵魂相契、能欣赏我们本来模样的人 (appreciate us as we are)。C选项符合此意。"
    }
  ]
};

// ==========================================
// 第3套 Passage Two：植物肉的兴起 (Health/Food)
// ==========================================
const articleSet3Passage2 = {
  id: "2025-06-set3-passage2",
  title: "The Rise of Plant-Based Meat",
  tags: ["Health", "Food"],
  vocab: [
    { word: "dismiss", phonetic: "/dɪsˈmɪs/", cn: "摒弃；不予考虑" },
    { word: "texture", phonetic: "/ˈtekstʃər/", cn: "口感；质地" },
    { word: "skyrocket", phonetic: "/ˈskaɪrɑːkɪt/", cn: "飞涨；猛涨" },
    { word: "cholesterol", phonetic: "/kəˈlestərɔːl/", cn: "胆固醇" },
    { word: "substitute", phonetic: "/ˈsʌbstɪtuːt/", cn: "替代品" }
  ],
  content: [
    {
      id: 1,
      en: "Plant-based meats are coming soon to a dinner table near you, but do they deserve a spot on your plate? If you tried a vegetable burger years ago and dismissed it as rubbery and flavorless, it's a good time to give meatless meat another chance. Newer varieties imitate the look, flavor, and texture of meat. Analysts don't expect the meat-free movement to slow anytime soon; a 2021 report predicts the market will skyrocket to $74 billion by 2030-a 957 percent surge.",
      cn: "植物肉即将登上你身边的餐桌，但它们真的值得在你的餐盘里占据一席之地吗？如果你多年前尝过蔬菜汉堡，还曾嫌弃它口感像橡胶又寡淡无味，那么现在正是重新尝试素肉的好时机。新一代产品在外观、风味和口感上都能模仿肉类。分析人士认为，素食潮流短期内不会放缓；2021年的一份报告预测，到2030年该市场规模将飙升至740亿美元——增幅高达957%。"
    },
    {
      id: 2,
      en: "Plant-based meats are no longer just for vegetarians. Companies such as Impossible Foods and Beyond Meat—the current superstars of the alternative protein sector—are pursuing consumers who enjoy meat but want to reduce their meat consumption for animal rights, health, or environmental reasons. So far, it's a winning strategy: More than nine out of ten consumers who buy Beyond Burger and Impossible Foods products also eat meat.",
      cn: "植物肉不再只是素食者的专属。像“不可能食品”和“超越肉类”这样的企业——当下替代蛋白领域的明星品牌——正将目标锁定在那些既爱吃肉，又希望出于动物权益、健康或环保考量减少肉食的消费群体。目前来看，这一策略成效显著：购买“超越汉堡”和“不可能食品”产品的消费者中，超过九成也食用肉类。"
    },
    {
      id: 3,
      en: "Many vegetarians don't actually care for food that resembles meat. When reporter Joan Solsman, a longtime vegetarian, tried a dish from Impossible Foods, she felt so sick that she couldn't finish it. \"Maybe the best sign that Impossible Foods has cracked the code to realistic fake meat is that I couldn't stand to take another bite,\" she wrote.",
      cn: "实际上，许多素食者并不钟爱仿荤食品。记者琼·索尔斯曼作为长期素食者，在尝试了“不可能食品”的一道菜后感到非常不适，甚至没能吃完。“或许“不可能食品”已经掌握了制作逼真素肉的密码，最好的证明就是我一口都吃不下了，”她写道。"
    },
    {
      id: 4,
      en: "Meatless meats are generally a healthier choice than beef because they are cholesterol-free, plus they're a good source of vitamins, minerals, protein, and fiber. If meatless meat can help you stick to a plant-based diet, that in itself can lead to better health. Not only has red meat been linked to cancer, but studies show that people who ditch meat have lower blood pressure, lower average blood sugar, and lower cholesterol levels.",
      cn: "相比牛肉，素肉通常是更健康的选择，因为它们不含胆固醇，而且，它们是维生素、矿物质、蛋白质和纤维的良好来源。如果素肉能帮助你坚持植物性饮食，这本身就能促进健康。研究显示，红肉不仅与癌症有关联，而且不食用肉类的人血压、平均血糖和胆固醇水平都更低。"
    },
    {
      id: 5,
      en: "However, just because it's plant-based doesn't mean it's health food. Most imitation meats are highly processed and contain high amounts of sodium compared to traditional beef. These new generations of alternate meat get all the attention, but don't forget about whole grains and vegetables. Beans are an especially excellent protein substitute. They're nutritious, inexpensive, and far more sustainable than any of the processed meatless substitutes on the market today.",
      cn: "不过，植物肉并不等同于健康食物。大多数仿肉产品经过深加工，其钠含量甚至远超传统牛肉。这些新一代替代肉类备受关注，但也别忘了全谷物和蔬菜。豆类是极佳的蛋白质替代品，它们营养丰富、价格实惠，而且比当今市场上任何加工素肉替代产品都更具可持续性。"
    }
  ],
  quiz: [
    {
      id: 51,
      question: "What can we expect of plant-based meats?",
      options: [
        { id: "A", text: "An increasing interest in their analyses." },
        { id: "B", text: "An enormous effort in their promotion." },
        { id: "C", text: "A huge boost in their consumption." },
        { id: "D", text: "A noticeable surge in their varieties." }
      ],
      correctId: "C",
      analysis: "第一段提到，分析人士预测该市场规模将飙升至740亿美元，增幅高达957%。这预示着消费量的巨大增长 (huge boost in consumption)。"
    },
    {
      id: 52,
      question: "What do we learn about consumers buying Beyond Burger and Impossible Foods products?",
      options: [
        { id: "A", text: "They are mostly non-vegetarians." },
        { id: "B", text: "They are mostly animal-rights advocates." },
        { id: "C", text: "Most of them refrain from eating meat for health reasons." },
        { id: "D", text: "Most of them eat meatless meat to protect the environment." }
      ],
      correctId: "A",
      analysis: "第二段最后一句提到，购买这些产品的消费者中，超过九成也食用肉类 (also eat meat)。说明他们大多数不是素食者 (non-vegetarians)。"
    },
    {
      id: 53,
      question: "What can we conclude about Impossible Foods' products from Joan Solsman's remark?",
      options: [
        { id: "A", text: "They more often appeal to meat-eaters." },
        { id: "B", text: "They very much resemble animal meat." },
        { id: "C", text: "Some have become its signature dishes." },
        { id: "D", text: "Most of them are sold as true fake meat." }
      ],
      correctId: "B",
      analysis: "第三段中，长期素食者 Joan Solsman 觉得这道菜太像肉了以至于吃不下去。她的评价证明了这些产品非常逼真 (realistic fake meat)，即 resemble animal meat。"
    },
    {
      id: 54,
      question: "Why can the habit of eating a plant-based diet lead to better health?",
      options: [
        { id: "A", text: "It frees people from any known link to cancer." },
        { id: "B", text: "It provides all the nutrients for staying healthy." },
        { id: "C", text: "It helps maintain normal blood pressure and blood sugar." },
        { id: "D", text: "It reduces various health risks posed by meat consumption." }
      ],
      correctId: "D",
      analysis: "第四段指出，不食用肉类的人有更低的血压、血糖和胆固醇，且红肉与癌症有关。因此植物性饮食减少了肉类带来的各种健康风险。"
    },
    {
      id: 55,
      question: "What does the author recommend we eat at the end of the passage?",
      options: [
        { id: "A", text: "Naturally produced foods." },
        { id: "B", text: "Processed protein substitutes." },
        { id: "C", text: "Red meats like traditional beef." },
        { id: "D", text: "New generations of alternate meat." }
      ],
      correctId: "A",
      analysis: "文章最后一段指出，豆类 (Beans) 是极佳的替代品，比加工素肉更具可持续性，且提醒大家不要忘了全谷物和蔬菜。这说明作者推荐天然食物 (Naturally produced foods)。"
    }
  ]
};

// ==========================================
// 统一导出 (Export)
// ==========================================
export const articles = [
  articleSet1Passage1,
  articleSet1Passage2,
  articleSet2Passage1,
  articleSet2Passage2,
  articleSet3Passage1,
  articleSet3Passage2
];

export function getArticleById(articleId: string) {
  return articles.find((a) => a.id === articleId);
}
