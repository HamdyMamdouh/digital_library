/* 1. Interactive Neural Network Background Canvas */
      (function initNeuralBg() {
        var canvas = document.getElementById("neuralCanvas");
        if (!canvas) return;
        var ctx = canvas.getContext("2d");
        var w, h, nodes = [], mouse = { x: -999, y: -999 };

        function resize() {
          w = canvas.width = canvas.offsetWidth;
          h = canvas.height = canvas.offsetHeight;
        }
        window.addEventListener("resize", resize);
        resize();

        window.addEventListener("mousemove", function(e) {
          var rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
        });

        var count = Math.min(55, Math.floor((w * h) / 16000));
        for (var i = 0; i < count; i++) {
          nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.55,
            vy: (Math.random() - 0.5) * 0.55,
            r: Math.random() * 1.8 + 1.2
          });
        }

        function animate() {
          ctx.clearRect(0, 0, w, h);
          for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;

            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(56, 189, 248, 0.65)";
            ctx.fill();

            for (var j = i + 1; j < nodes.length; j++) {
              var n2 = nodes[j];
              var dist = Math.hypot(n.x - n2.x, n.y - n2.y);
              if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.strokeStyle = "rgba(56, 189, 248," + (1 - dist / 130) * 0.25 + ")";
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }

            var mDist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
            if (mDist < 160) {
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = "rgba(129, 140, 248," + (1 - mDist / 160) * 0.5 + ")";
              ctx.lineWidth = 1.1;
              ctx.stroke();
            }
          }
          requestAnimationFrame(animate);
        }
        animate();
      })();

      /* 2. Core Data & Categories */
      var F = {
        prog: ["لغات البرمجة", "#2563eb", "💻"],
        web: ["تطوير الويب", "#d97706", "🌐"],
        ai: ["الذكاء الاصطناعي وتعلم الآلة", "#7c3aed", "🧠"],
        dl: ["التعلم العميق واللغة والرؤية", "#db2777", "🕸️"],
        ds: ["علم البيانات والتحليل", "#059669", "📊"],
        db: ["قواعد البيانات", "#0d9488", "🗄️"],
        th: ["الخوارزميات ونظرية الحاسب", "#4f46e5", "🧮"],
        math: ["رياضيات للحاسب", "#475569", "∑"],
        sys: ["نظم التشغيل والمعمارية", "#334155", "⚙️"],
        net: ["الشبكات", "#0284c7", "📡"],
        sec: ["أمن المعلومات والتشفير", "#dc2626", "🔐"],
        se: ["هندسة البرمجيات", "#0f766e", "🛠️"],
        cloud: ["السحابة وDevOps", "#0891b2", "☁️"],
        hci: ["واجهات وتجربة المستخدم", "#e11d48", "🎨"],
        game: ["الرسوميات والألعاب", "#ea580c", "🎮"]
      };

      var ROADMAPS = {
        cs_core: [
          "Structure and Interpretation of Computer Programs",
          "Introduction to Algorithms",
          "Computer Systems: A Programmer's Perspective",
          "Operating Systems: Three Easy Pieces",
          "Computer Networking: A Top-Down Approach",
          "Database System Concepts"
        ],
        ai_master: [
          "Mathematics for Machine Learning",
          "Hands-On Machine Learning with Scikit-Learn, Keras and TensorFlow",
          "Deep Learning",
          "Dive into Deep Learning",
          "Attention Is All You Need",
          "Natural Language Processing with Transformers",
          "AI Engineering"
        ],
        swe_pro: [
          "Clean Code",
          "The Pragmatic Programmer",
          "Design Patterns",
          "Designing Data-Intensive Applications",
          "Software Engineering at Google",
          "Building Microservices"
        ],
        sec_path: [
          "Cryptography and Network Security",
          "Serious Cryptography",
          "The Web Application Hacker's Handbook",
          "Hacking: The Art of Exploitation",
          "Security Engineering",
          "Practical Malware Analysis"
        ]
      };

      var R0 = [
        "Attention Is All You Need|Vaswani, Shazeer, Parmar et al.|2017|NeurIPS|dl|p|a:1706.03762",
        "Deep Residual Learning for Image Recognition|He, Zhang, Ren, Sun|2016|CVPR|dl|p|a:1512.03385",
        "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding|Devlin, Chang, Lee, Toutanova|2019|NAACL|dl|p|a:1810.04805",
        "Language Models are Few-Shot Learners|Brown et al.|2020|NeurIPS|dl|p|a:2005.14165",
        "Generative Adversarial Nets|Goodfellow et al.|2014|NeurIPS|dl|p|a:1406.2661",
        "Adam: A Method for Stochastic Optimization|Kingma, Ba|2015|ICLR|dl|p|a:1412.6980",
        "Denoising Diffusion Probabilistic Models|Ho, Jain, Abbeel|2020|NeurIPS|dl|p|a:2006.11239",
        "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models|Wei et al.|2022|NeurIPS|dl|p|a:2201.11903",
        "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks|Lewis et al.|2020|NeurIPS|dl|p|a:2005.11401",
        "LoRA: Low-Rank Adaptation of Large Language Models|Hu et al.|2022|ICLR|dl|p|a:2106.09685",
        "Scaling Laws for Neural Language Models|Kaplan et al.|2020|arXiv|dl|p|a:2001.08361",
        "Training language models to follow instructions with human feedback|Ouyang et al.|2022|NeurIPS|dl|p|a:2203.02155",
        "Constitutional AI: Harmlessness from AI Feedback|Bai et al.|2022|arXiv|dl|p|a:2212.08073",
        "Efficient Estimation of Word Representations in Vector Space|Mikolov, Chen, Corrado, Dean|2013|arXiv|dl|p|a:1301.3781",
        "ImageNet Classification with Deep Convolutional Neural Networks|Krizhevsky, Sutskever, Hinton|2012|NeurIPS|dl|p",
        "Mastering the game of Go with deep neural networks and tree search|Silver et al.|2016|Nature|dl|p",
        "Computing Machinery and Intelligence|Turing|1950|Mind|ai|p",
        "On Computable Numbers, with an Application to the Entscheidungsproblem|Turing|1936|Proc. London Mathematical Society|th|p",
        "A Mathematical Theory of Communication|Shannon|1948|Bell System Technical Journal|th|p",
        "Go To Statement Considered Harmful|Dijkstra|1968|Communications of the ACM|se|p",
        "A Relational Model of Data for Large Shared Data Banks|Codd|1970|Communications of the ACM|db|p",
        "MapReduce: Simplified Data Processing on Large Clusters|Dean, Ghemawat|2004|OSDI|sys|p",
        "The Google File System|Ghemawat, Gobioff, Leung|2003|SOSP|sys|p",
        "Bigtable: A Distributed Storage System for Structured Data|Chang et al.|2006|OSDI|sys|p",
        "Dynamo: Amazon's Highly Available Key-value Store|DeCandia et al.|2007|SOSP|sys|p",
        "Time, Clocks, and the Ordering of Events in a Distributed System|Lamport|1978|Communications of the ACM|sys|p",
        "In Search of an Understandable Consensus Algorithm (Raft)|Ongaro, Ousterhout|2014|USENIX ATC|sys|p",
        "The Part-Time Parliament (Paxos)|Lamport|1998|ACM TOCS|sys|p",
        "The UNIX Time-Sharing System|Ritchie, Thompson|1974|Communications of the ACM|sys|p",
        "Hidden Technical Debt in Machine Learning Systems|Sculley et al.|2015|NeurIPS|se|p",
        "New Directions in Cryptography|Diffie, Hellman|1976|IEEE Transactions on Information Theory|sec|p",
        "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems|Rivest, Shamir, Adleman|1978|Communications of the ACM|sec|p",
        "Reflections on Trusting Trust|Thompson|1984|Communications of the ACM|sec|p",
        "Bitcoin: A Peer-to-Peer Electronic Cash System|Nakamoto|2008|Whitepaper|sec|p|u:bitcoin.org/bitcoin.pdf",
        "Spectre Attacks: Exploiting Speculative Execution|Kocher et al.|2019|IEEE S&P|sec|p|a:1801.01203",
        "End-to-End Arguments in System Design|Saltzer, Reed, Clark|1984|ACM TOCS|net|p",
        "A Protocol for Packet Network Intercommunication|Cerf, Kahn|1974|IEEE Transactions on Communications|net|p",
        "Congestion Avoidance and Control|Jacobson|1988|SIGCOMM|net|p",
        "The Anatomy of a Large-Scale Hypertextual Web Search Engine|Brin, Page|1998|WWW7|web|p",
        "Introduction to Algorithms|Cormen, Leiserson, Rivest, Stein|2022|MIT Press, 4th ed.|th|b",
        "The Art of Computer Programming|Knuth|1968|Addison-Wesley|th|b",
        "Crafting Interpreters|Nystrom|2021|Genever Benning|th|b|u:craftinginterpreters.com",
        "Structure and Interpretation of Computer Programs|Abelson, Sussman|1996|MIT Press, 2nd ed.|se|b|u:mitpress.mit.edu/sites/default/files/sicp/index.html",
        "The Mythical Man-Month|Brooks|1975|Addison-Wesley|se|b",
        "Design Patterns|Gamma, Helm, Johnson, Vlissides|1994|Addison-Wesley|se|b",
        "Clean Code|Martin|2008|Prentice Hall|se|b",
        "The Pragmatic Programmer|Hunt, Thomas|2019|Addison-Wesley, 20th anniversary ed.|se|b",
        "Pro Git|Chacon, Straub|2014|Apress|se|b|u:git-scm.com/book",
        "Artificial Intelligence: A Modern Approach|Russell, Norvig|2020|Pearson, 4th ed.|ai|b",
        "Deep Learning|Goodfellow, Bengio, Courville|2016|MIT Press|dl|b|u:www.deeplearningbook.org",
        "Dive into Deep Learning|Zhang, Lipton, Li, Smola|2023|Cambridge University Press|dl|b|u:d2l.ai",
        "Speech and Language Processing|Jurafsky, Martin|2025|Draft, 3rd ed.|dl|b|u:web.stanford.edu/~jurafsky/slp3/",
        "Designing Data-Intensive Applications|Kleppmann|2017|O'Reilly|db|b",
        "Operating System Concepts|Silberschatz, Galvin, Gagne|2018|Wiley, 10th ed.|sys|b",
        "Computer Systems: A Programmer's Perspective|Bryant, O'Hallaron|2015|Pearson, 3rd ed.|sys|b",
        "The Linux Command Line|Shotts|2019|No Starch Press, 2nd ed.|sys|b|u:linuxcommand.org/tlcl.php",
        "Computer Networking: A Top-Down Approach|Kurose, Ross|2021|Pearson, 8th ed.|net|b",
        "Security Engineering|Anderson|2020|Wiley, 3rd ed.|sec|b|u:www.cl.cam.ac.uk/~rja14/book.html",
        "The Web Application Hacker's Handbook|Stuttard, Pinto|2011|Wiley, 2nd ed.|sec|b",
        "The Design of Everyday Things|Norman|2013|Basic Books, revised ed.|hci|b",
        "Don't Make Me Think|Krug|2014|New Riders, 3rd ed.|hci|b",
        "Eloquent JavaScript|Haverbeke|2024|No Starch Press, 4th ed.|prog|b|u:eloquentjavascript.net",
        "Automate the Boring Stuff with Python|Sweigart|2019|No Starch Press, 2nd ed.|prog|b|u:automatetheboringstuff.com",
        "The Rust Programming Language|Klabnik, Nichols|2023|No Starch Press|prog|b|u:doc.rust-lang.org/book/",
        "Linear Algebra Done Right|Axler|1995|Springer|math|b|u:linear.axler.net",
        "Introduction to Linear Algebra|Strang|1993|Wellesley-Cambridge Press|math|b",
        "Concrete Mathematics|Graham, Knuth, Patashnik|1989|Addison-Wesley|math|b",
        "Statistical Inference|Casella, Berger|2002|Cengage|math|b",
        "The Elements of Statistical Learning|Hastie, Tibshirani, Friedman|2009|Springer|ai|b|u:hastie.su.domains/ElemStatLearn/",
        "An Introduction to Statistical Learning|James, Witten, Hastie, Tibshirani|2021|Springer|ai|b|u:www.statlearning.com",
        "Gödel, Escher, Bach|Hofstadter|1979|Basic Books|th|b",
        "Digital Design and Computer Architecture|Harris, Harris|2012|Morgan Kaufmann, 2nd ed.|sys|b",
        "Computer Organization and Design|Patterson, Hennessy|2020|Morgan Kaufmann|sys|b",
        "Computer Architecture: A Quantitative Approach|Hennessy, Patterson|2019|Morgan Kaufmann, 6th ed.|sys|b",
        "The C Programming Language|Kernighan, Ritchie|1988|Prentice Hall, 2nd ed.|prog|b",
        "Code: The Hidden Language of Computer Hardware and Software|Petzold|2022|Microsoft Press, 2nd ed.|th|b",
        "Python Crash Course|Matthes|2023|No Starch Press, 3rd ed.|prog|b",
        "Fluent Python|Ramalho|2022|O'Reilly, 2nd ed.|prog|b",
        "Effective Java|Bloch|2018|Addison-Wesley, 3rd ed.|prog|b",
        "You Don't Know JS Yet|Simpson|2020|Self-published|prog|b|u:github.com/getify/You-Dont-Know-JS",
        "Refactoring|Fowler|2018|Addison-Wesley, 2nd ed.|se|b",
        "Code Complete|McConnell|2004|Microsoft Press, 2nd ed.|se|b",
        "Database System Concepts|Silberschatz, Korth, Sudarshan|2019|McGraw-Hill, 7th ed.|db|b",
        "Pattern Recognition and Machine Learning|Bishop|2006|Springer|ai|b|u:www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/",
        "Probabilistic Machine Learning: An Introduction|Murphy|2022|MIT Press|ai|b|u:probml.github.io/pml-book/book1.html",
        "Hands-On Machine Learning with Scikit-Learn, Keras and TensorFlow|Géron|2022|O'Reilly, 3rd ed.|ai|b",
        "Reinforcement Learning: An Introduction|Sutton, Barto|2018|MIT Press, 2nd ed.|ai|b|u:incompleteideas.net/book/the-book-2nd.html",
        "Superintelligence|Bostrom|2014|Oxford University Press|ai|b",
        "Human Compatible|Russell|2019|Viking|ai|b",
        "The Master Algorithm|Domingos|2015|Basic Books|ai|b",
        "Applied Cryptography|Schneier|1996|Wiley, 2nd ed.|sec|b",
        "Cryptography Engineering|Ferguson, Schneier, Kohno|2010|Wiley|sec|b",
        "Hacking: The Art of Exploitation|Erickson|2008|No Starch Press, 2nd ed.|sec|b",
        "Computer Networks|Tanenbaum, Wetherall|2011|Pearson, 5th ed.|net|b",
        "TCP/IP Illustrated, Volume 1|Fall, Stevens|2011|Addison-Wesley, 2nd ed.|net|b",
        "Modern Operating Systems|Tanenbaum, Bos|2014|Pearson, 4th ed.|sys|b",
        "Operating Systems: Three Easy Pieces|Arpaci-Dusseau|2018|Arpaci-Dusseau Books|sys|b|u:pages.cs.wisc.edu/~remzi/OSTEP/",
        "Compilers: Principles, Techniques, and Tools|Aho, Lam, Sethi, Ullman|2006|Pearson, 2nd ed.|th|b",
        "Site Reliability Engineering|Beyer et al.|2016|O'Reilly|cloud|b|u:sre.google/books/",
        "Accelerate|Forsgren, Humble, Kim|2018|IT Revolution|cloud|b",
        "About Face: The Essentials of Interaction Design|Cooper et al.|2014|Wiley, 4th ed.|hci|b"
      ];

      var NEW = [
        "Learning Python|Lutz|2013|O'Reilly, 5th ed.|prog|b",
        "Python Cookbook|Beazley, Jones|2013|O'Reilly, 3rd ed.|prog|b",
        "Effective Python|Slatkin|2019|Addison-Wesley, 2nd ed.|prog|b",
        "Think Python|Downey|2015|O'Reilly, 2nd ed.|prog|b|u:greenteapress.com/wp/think-python-2e/",
        "Introduction to Computation and Programming Using Python|Guttag|2021|MIT Press, 3rd ed.|prog|b",
        "Programming: Principles and Practice Using C++|Stroustrup|2014|Addison-Wesley, 2nd ed.|prog|b",
        "The C++ Programming Language|Stroustrup|2013|Addison-Wesley, 4th ed.|prog|b",
        "A Tour of C++|Stroustrup|2022|Addison-Wesley, 3rd ed.|prog|b",
        "Effective Modern C++|Meyers|2014|O'Reilly|prog|b",
        "C++ Primer|Lippman, Lajoie, Moo|2012|Addison-Wesley, 5th ed.|prog|b",
        "Head First Java|Sierra, Bates, Gee|2022|O'Reilly, 3rd ed.|prog|b",
        "Java: The Complete Reference|Schildt|2021|McGraw-Hill, 12th ed.|prog|b",
        "Core Java, Volume I: Fundamentals|Horstmann|2022|Oracle Press, 12th ed.|prog|b",
        "Java Concurrency in Practice|Goetz et al.|2006|Addison-Wesley|prog|b",
        "The Go Programming Language|Donovan, Kernighan|2015|Addison-Wesley|prog|b",
        "Programming Rust|Blandy, Orendorff, Tindall|2021|O'Reilly, 2nd ed.|prog|b",
        "Programming in Scala|Odersky, Spoon, Venners|2021|Artima, 5th ed.|prog|b",
        "Kotlin in Action|Jemerov, Isakova|2017|Manning|prog|b",
        "C# in Depth|Skeet|2019|Manning, 4th ed.|prog|b",
        "Programming Pearls|Bentley|1999|Addison-Wesley, 2nd ed.|prog|b",
        "Learn You a Haskell for Great Good!|Lipovača|2011|No Starch Press|prog|b|u:learnyouahaskell.com",
        "JavaScript: The Good Parts|Crockford|2008|O'Reilly|prog|b",
        "JavaScript: The Definitive Guide|Flanagan|2020|O'Reilly, 7th ed.|prog|b",
        "Programming TypeScript|Cherny|2019|O'Reilly|prog|b",
        "Types and Programming Languages|Pierce|2002|MIT Press|th|b",
        "Programming Language Pragmatics|Scott|2015|Morgan Kaufmann, 4th ed.|th|b",
        "Concepts, Techniques, and Models of Computer Programming|Van Roy, Haridi|2004|MIT Press|th|b",
        "HTML and CSS: Design and Build Websites|Duckett|2011|Wiley|web|b",
        "CSS: The Definitive Guide|Meyer, Weyl|2023|O'Reilly, 5th ed.|web|b",
        "Learning Web Design|Robbins|2018|O'Reilly, 5th ed.|web|b",
        "High Performance Browser Networking|Grigorik|2013|O'Reilly|net|b|u:hpbn.co",
        "Learning React|Banks, Porcello|2020|O'Reilly, 2nd ed.|web|b",
        "Node.js Design Patterns|Casciaro, Mammino|2020|Packt, 3rd ed.|web|b",
        "Flask Web Development|Grinberg|2018|O'Reilly, 2nd ed.|web|b",
        "RESTful Web APIs|Richardson, Amundsen, Ruby|2013|O'Reilly|web|b",
        "Learning SQL|Beaulieu|2020|O'Reilly, 3rd ed.|db|b",
        "SQL Performance Explained|Winand|2012|Self-published|db|b|u:sql-performance-explained.com",
        "High Performance MySQL|Schwartz et al.|2012|O'Reilly, 3rd ed.|db|b",
        "PostgreSQL: Up and Running|Obe, Hsu|2017|O'Reilly, 3rd ed.|db|b",
        "Database Internals|Petrov|2019|O'Reilly|db|b",
        "Fundamentals of Database Systems|Elmasri, Navathe|2016|Pearson, 7th ed.|db|b",
        "Database Management Systems|Ramakrishnan, Gehrke|2002|McGraw-Hill, 3rd ed.|db|b",
        "Readings in Database Systems|Hellerstein, Stonebraker|2005|MIT Press, 4th ed.|db|b|u:www.redbook.io",
        "NoSQL Distilled|Sadalage, Fowler|2012|Addison-Wesley|db|b",
        "Transaction Processing: Concepts and Techniques|Gray, Reuter|1992|Morgan Kaufmann|db|b",
        "Algorithms|Sedgewick, Wayne|2011|Addison-Wesley, 4th ed.|th|b",
        "Algorithm Design|Kleinberg, Tardos|2005|Pearson|th|b",
        "The Algorithm Design Manual|Skiena|2020|Springer, 3rd ed.|th|b",
        "Algorithms|Dasgupta, Papadimitriou, Vazirani|2008|McGraw-Hill|th|b",
        "Cracking the Coding Interview|McDowell|2015|CareerCup, 6th ed.|th|b",
        "Grokking Algorithms|Bhargava|2016|Manning|th|b",
        "Introduction to the Theory of Computation|Sipser|2012|Cengage, 3rd ed.|th|b",
        "Introduction to Automata Theory, Languages, and Computation|Hopcroft, Motwani, Ullman|2006|Pearson, 3rd ed.|th|b",
        "Computational Complexity: A Modern Approach|Arora, Barak|2009|Cambridge University Press|th|b",
        "Computers and Intractability|Garey, Johnson|1979|W. H. Freeman|th|b",
        "Data Structures and Algorithms in Python|Goodrich, Tamassia, Goldwasser|2013|Wiley|th|b",
        "Data Structures and Algorithm Analysis in C++|Weiss|2013|Pearson, 4th ed.|th|b",
        "Algorithms Illuminated|Roughgarden|2017|Soundlikeyourself Publishing|th|b",
        "Quantum Computation and Quantum Information|Nielsen, Chuang|2010|Cambridge University Press|th|b",
        "Discrete Mathematics and Its Applications|Rosen|2018|McGraw-Hill, 8th ed.|math|b",
        "Probability and Computing|Mitzenmacher, Upfal|2017|Cambridge University Press, 2nd ed.|math|b",
        "Introduction to Probability|Blitzstein, Hwang|2019|CRC Press, 2nd ed.|math|b",
        "Convex Optimization|Boyd, Vandenberghe|2004|Cambridge University Press|math|b|u:web.stanford.edu/~boyd/cvxbook/",
        "Mathematics for Machine Learning|Deisenroth, Faisal, Ong|2020|Cambridge University Press|math|b|u:mml-book.com",
        "Linear Algebra and Learning from Data|Strang|2019|Wellesley-Cambridge Press|math|b",
        "Information Theory, Inference, and Learning Algorithms|MacKay|2003|Cambridge University Press|math|b|u:www.inference.org.uk/itila/book.html",
        "Numerical Linear Algebra|Trefethen, Bau|1997|SIAM|math|b",
        "Machine Learning|Mitchell|1997|McGraw-Hill|ai|b",
        "Machine Learning: A Probabilistic Perspective|Murphy|2012|MIT Press|ai|b",
        "Understanding Machine Learning: From Theory to Algorithms|Shalev-Shwartz, Ben-David|2014|Cambridge University Press|ai|b|u:www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/",
        "Foundations of Machine Learning|Mohri, Rostamizadeh, Talwalkar|2018|MIT Press, 2nd ed.|ai|b",
        "Python Machine Learning|Raschka, Mirjalili|2019|Packt, 3rd ed.|ai|b",
        "Machine Learning with PyTorch and Scikit-Learn|Raschka, Liu, Mirjalili|2022|Packt|ai|b",
        "Introduction to Machine Learning|Alpaydin|2020|MIT Press, 4th ed.|ai|b",
        "Pattern Classification|Duda, Hart, Stork|2001|Wiley, 2nd ed.|ai|b",
        "Probabilistic Machine Learning: Advanced Topics|Murphy|2023|MIT Press|ai|b|u:probml.github.io/pml-book/book2.html",
        "Artificial Intelligence: Foundations of Computational Agents|Poole, Mackworth|2023|Cambridge University Press, 3rd ed.|ai|b|u:artint.info",
        "Probabilistic Robotics|Thrun, Burgard, Fox|2005|MIT Press|ai|b",
        "Modern Robotics|Lynch, Park|2017|Cambridge University Press|ai|b|u:modernrobotics.northwestern.edu",
        "Introduction to Robotics: Mechanics and Control|Craig|2017|Pearson, 4th ed.|ai|b",
        "Designing Machine Learning Systems|Huyen|2022|O'Reilly|ai|b",
        "AI Engineering|Huyen|2025|O'Reilly|ai|b",
        "Machine Learning Engineering|Burkov|2020|True Positive Inc.|ai|b",
        "Building Machine Learning Powered Applications|Ameisen|2020|O'Reilly|ai|b",
        "Prompt Engineering for Generative AI|Phoenix, Taylor|2024|O'Reilly|ai|b",
        "The Hundred-Page Machine Learning Book|Burkov|2019|Andriy Burkov|ai|b|u:themlbook.com",
        "Life 3.0|Tegmark|2017|Knopf|ai|b",
        "The Alignment Problem|Christian|2020|W. W. Norton|ai|b",
        "Weapons of Math Destruction|O'Neil|2016|Crown|ai|b",
        "Fairness and Machine Learning|Barocas, Hardt, Narayanan|2023|MIT Press|ai|b|u:fairmlbook.org",
        "Interpretable Machine Learning|Molnar|2022|Lulu, 2nd ed.|ai|b|u:christophm.github.io/interpretable-ml-book/",
        "Deep Learning with Python|Chollet|2021|Manning, 2nd ed.|dl|b",
        "Deep Learning with PyTorch|Stevens, Antiga, Viehmann|2020|Manning|dl|b|u:pytorch.org/deep-learning-with-pytorch",
        "Neural Networks and Deep Learning|Nielsen|2015|Determination Press|dl|b|u:neuralnetworksanddeeplearning.com",
        "Deep Learning for Coders with fastai and PyTorch|Howard, Gugger|2020|O'Reilly|dl|b",
        "Understanding Deep Learning|Prince|2023|MIT Press|dl|b|u:udlbook.github.io/udlbook/",
        "Generative Deep Learning|Foster|2023|O'Reilly, 2nd ed.|dl|b",
        "Natural Language Processing with Transformers|Tunstall, von Werra, Wolf|2022|O'Reilly|dl|b",
        "Natural Language Processing with Python|Bird, Klein, Loper|2009|O'Reilly|dl|b|u:www.nltk.org/book/",
        "Foundations of Statistical Natural Language Processing|Manning, Schütze|1999|MIT Press|dl|b",
        "Neural Network Methods for Natural Language Processing|Goldberg|2017|Morgan & Claypool|dl|b",
        "Hands-On Large Language Models|Alammar, Grootendorst|2024|O'Reilly|dl|b",
        "Computer Vision: Algorithms and Applications|Szeliski|2022|Springer, 2nd ed.|dl|b|u:szeliski.org/Book/",
        "Multiple View Geometry in Computer Vision|Hartley, Zisserman|2004|Cambridge University Press, 2nd ed.|dl|b",
        "Computer Vision: A Modern Approach|Forsyth, Ponce|2011|Pearson, 2nd ed.|dl|b",
        "Digital Image Processing|Gonzalez, Woods|2018|Pearson, 4th ed.|dl|b",
        "Programming Computer Vision with Python|Solem|2012|O'Reilly|dl|b",
        "Deep Reinforcement Learning Hands-On|Lapan|2020|Packt, 2nd ed.|dl|b",
        "Grokking Deep Learning|Trask|2019|Manning|dl|b",
        "Python Data Science Handbook|VanderPlas|2016|O'Reilly|ds|b|u:jakevdp.github.io/PythonDataScienceHandbook/",
        "Python for Data Analysis|McKinney|2022|O'Reilly, 3rd ed.|ds|b|u:wesmckinney.com/book/",
        "R for Data Science|Wickham, Çetinkaya-Rundel, Grolemund|2023|O'Reilly, 2nd ed.|ds|b|u:r4ds.hadley.nz",
        "Storytelling with Data|Knaflic|2015|Wiley|ds|b",
        "Data Science from Scratch|Grus|2019|O'Reilly, 2nd ed.|ds|b",
        "Think Stats|Downey|2014|O'Reilly, 2nd ed.|ds|b|u:greenteapress.com/wp/think-stats-2e/",
        "Think Bayes|Downey|2021|O'Reilly, 2nd ed.|ds|b|u:greenteapress.com/wp/think-bayes/",
        "Mining of Massive Datasets|Leskovec, Rajaraman, Ullman|2020|Cambridge University Press, 3rd ed.|ds|b|u:www.mmds.org",
        "Data Science for Business|Provost, Fawcett|2013|O'Reilly|ds|b",
        "Practical Statistics for Data Scientists|Bruce, Bruce, Gedeck|2020|O'Reilly, 2nd ed.|ds|b",
        "The Visual Display of Quantitative Information|Tufte|2001|Graphics Press, 2nd ed.|ds|b",
        "Spark: The Definitive Guide|Chambers, Zaharia|2018|O'Reilly|ds|b",
        "Fundamentals of Data Engineering|Reis, Housley|2022|O'Reilly|ds|b",
        "Streaming Systems|Akidau, Chernyak, Lax|2018|O'Reilly|ds|b",
        "Hadoop: The Definitive Guide|White|2015|O'Reilly, 4th ed.|ds|b",
        "Bayesian Data Analysis|Gelman et al.|2013|CRC Press, 3rd ed.|ds|b|u:www.stat.columbia.edu/~gelman/book/",
        "Statistical Rethinking|McElreath|2020|CRC Press, 2nd ed.|ds|b",
        "Cryptography and Network Security|Stallings|2016|Pearson, 7th ed.|sec|b",
        "Computer Security: Principles and Practice|Stallings, Brown|2018|Pearson, 4th ed.|sec|b",
        "Introduction to Modern Cryptography|Katz, Lindell|2020|CRC Press, 3rd ed.|sec|b",
        "Handbook of Applied Cryptography|Menezes, van Oorschot, Vanstone|1996|CRC Press|sec|b|u:cacr.uwaterloo.ca/hac/",
        "Serious Cryptography|Aumasson|2017|No Starch Press|sec|b",
        "Practical Malware Analysis|Sikorski, Honig|2012|No Starch Press|sec|b",
        "Gray Hat Hacking|Harper et al.|2022|McGraw-Hill, 6th ed.|sec|b",
        "The Tangled Web|Zalewski|2011|No Starch Press|sec|b",
        "Black Hat Python|Seitz, Arnold|2021|No Starch Press, 2nd ed.|sec|b",
        "Threat Modeling: Designing for Security|Shostack|2014|Wiley|sec|b",
        "Cybersecurity and Cyberwar|Singer, Friedman|2014|Oxford University Press|sec|b",
        "The Cuckoo's Egg|Stoll|1989|Doubleday|sec|b",
        "Countdown to Zero Day|Zetter|2014|Crown|sec|b",
        "Mastering Bitcoin|Antonopoulos|2017|O'Reilly, 2nd ed.|sec|b|u:github.com/bitcoinbook/bitcoinbook",
        "Mastering Ethereum|Antonopoulos, Wood|2018|O'Reilly|sec|b",
        "Computer Networks: A Systems Approach|Peterson, Davie|2021|Morgan Kaufmann, 6th ed.|net|b|u:book.systemsapproach.org",
        "Network Warrior|Donahue|2011|O'Reilly, 2nd ed.|net|b",
        "Data Communications and Networking|Forouzan|2012|McGraw-Hill, 5th ed.|net|b",
        "Interconnections|Perlman|1999|Addison-Wesley, 2nd ed.|net|b",
        "Practical Packet Analysis|Sanders|2017|No Starch Press, 3rd ed.|net|b",
        "Operating Systems: Internals and Design Principles|Stallings|2017|Pearson, 9th ed.|sys|b",
        "Distributed Systems|van Steen, Tanenbaum|2017|Self-published, 3rd ed.|sys|b|u:www.distributed-systems.net",
        "Distributed Systems: Concepts and Design|Coulouris et al.|2011|Pearson, 5th ed.|sys|b",
        "Structured Computer Organization|Tanenbaum, Austin|2012|Pearson, 6th ed.|sys|b",
        "The Elements of Computing Systems|Nisan, Schocken|2021|MIT Press, 2nd ed.|sys|b|u:www.nand2tetris.org",
        "Systems Performance|Gregg|2020|Addison-Wesley, 2nd ed.|sys|b",
        "BPF Performance Tools|Gregg|2019|Addison-Wesley|sys|b",
        "Making Embedded Systems|White|2011|O'Reilly|sys|b",
        "Linux Kernel Development|Love|2010|Addison-Wesley, 3rd ed.|sys|b",
        "The Linux Programming Interface|Kerrisk|2010|No Starch Press|sys|b",
        "Advanced Programming in the UNIX Environment|Stevens, Rago|2013|Addison-Wesley, 3rd ed.|sys|b",
        "Understanding the Linux Kernel|Bovet, Cesati|2005|O'Reilly, 3rd ed.|sys|b",
        "UNIX and Linux System Administration Handbook|Nemeth et al.|2017|Addison-Wesley, 5th ed.|sys|b",
        "How Linux Works|Ward|2021|No Starch Press, 3rd ed.|sys|b",
        "The Art of Unix Programming|Raymond|2003|Addison-Wesley|sys|b|u:www.catb.org/~esr/writings/taoup/html/",
        "Clean Architecture|Martin|2017|Prentice Hall|se|b",
        "Domain-Driven Design|Evans|2003|Addison-Wesley|se|b",
        "Patterns of Enterprise Application Architecture|Fowler|2002|Addison-Wesley|se|b",
        "Head First Design Patterns|Freeman, Robson|2020|O'Reilly, 2nd ed.|se|b",
        "Working Effectively with Legacy Code|Feathers|2004|Prentice Hall|se|b",
        "Test Driven Development: By Example|Beck|2002|Addison-Wesley|se|b",
        "Release It!|Nygard|2018|Pragmatic Bookshelf, 2nd ed.|se|b",
        "Software Engineering at Google|Winters, Manshreck, Wright|2020|O'Reilly|se|b|u:abseil.io/resources/swe-book",
        "Fundamentals of Software Architecture|Richards, Ford|2020|O'Reilly|se|b",
        "Software Architecture in Practice|Bass, Clements, Kazman|2021|Addison-Wesley, 4th ed.|se|b",
        "Continuous Delivery|Humble, Farley|2010|Addison-Wesley|cloud|b",
        "The DevOps Handbook|Kim et al.|2016|IT Revolution|cloud|b",
        "Kubernetes in Action|Lukša|2017|Manning|cloud|b",
        "Terraform: Up and Running|Brikman|2022|O'Reilly, 3rd ed.|cloud|b",
        "The Phoenix Project|Kim, Behr, Spafford|2013|IT Revolution|cloud|b",
        "Building Microservices|Newman|2021|O'Reilly, 2nd ed.|cloud|b",
        "Cloud Native Patterns|Davis|2019|Manning|cloud|b",
        "Designing Interfaces|Tidwell|2020|O'Reilly, 3rd ed.|hci|b",
        "Interaction Design: Beyond Human-Computer Interaction|Preece, Rogers, Sharp|2019|Wiley, 5th ed.|hci|b",
        "Human-Computer Interaction|Dix et al.|2003|Pearson, 3rd ed.|hci|b",
        "The Elements of User Experience|Garrett|2010|New Riders, 2nd ed.|hci|b",
        "Refactoring UI|Wathan, Schoger|2018|Self-published|hci|b|u:refactoringui.com",
        "Emotional Design|Norman|2004|Basic Books|hci|b",
        "Game Programming Patterns|Nystrom|2014|Genever Benning|game|b|u:gameprogrammingpatterns.com",
        "Real-Time Rendering|Akenine-Möller, Haines, Hoffman|2018|CRC Press, 4th ed.|game|b|u:www.realtimerendering.com",
        "Physically Based Rendering|Pharr, Jakob, Humphreys|2023|MIT Press, 4th ed.|game|b|u:pbr-book.org",
        "Fundamentals of Computer Graphics|Marschner, Shirley|2021|CRC Press, 5th ed.|game|b",
        "Computer Graphics: Principles and Practice|Hughes et al.|2013|Addison-Wesley, 3rd ed.|game|b",
        "Game Engine Architecture|Gregory|2018|CRC Press, 3rd ed.|game|b",
        "The Art of Game Design|Schell|2019|CRC Press, 3rd ed.|game|b",
        "3D Math Primer for Graphics and Game Development|Dunn, Parberry|2011|CRC Press, 2nd ed.|game|b",
        "Unity in Action|Hocking|2021|Manning, 3rd ed.|game|b",
        "Learn OpenGL|de Vries|2020|Self-published|game|b|u:learnopengl.com",
        "Algorithms|Erickson|2019|Self-published|th|b|u:jeffe.cs.illinois.edu/teaching/algorithms/",
        "Open Data Structures|Morin|2013|AU Press|th|b|u:opendatastructures.org",
        "How to Design Programs|Felleisen et al.|2018|MIT Press, 2nd ed.|prog|b|u:htdp.org",
        "Software Foundations|Pierce et al.|2024|Online|th|b|u:softwarefoundations.cis.upenn.edu",
        "Real World OCaml|Minsky, Madhavapeddy|2022|Cambridge University Press, 2nd ed.|prog|b|u:dev.realworldocaml.org",
        "Think Java|Downey, Mayfield|2016|O'Reilly, 2nd ed.|prog|b|u:greenteapress.com/wp/think-java-2e/",
        "Python for Everybody|Severance|2016|CreateSpace|prog|b|u:www.py4e.com/book",
        "A Byte of Python|Swaroop|2024|Online|prog|b|u:python.swaroopch.com",
        "Dive Into Python 3|Pilgrim|2009|Apress|prog|b|u:diveintopython3.net",
        "Exploring JavaScript|Rauschmayer|2024|Online|prog|b|u:exploringjs.com",
        "Rust by Example|Rust Community|2024|Online|prog|b|u:doc.rust-lang.org/rust-by-example/",
        "Practical Common Lisp|Seibel|2005|Apress|prog|b|u:gigamonkeys.com/book/",
        "Mostly Adequate Guide to Functional Programming|Lonsdorf|2015|Online|prog|b|u:mostly-adequate.gitbook.io/mostly-adequate-guide",
        "Advanced R|Wickham|2019|CRC Press, 2nd ed.|prog|b|u:adv-r.hadley.nz",
        "Programming Languages: Application and Interpretation|Krishnamurthi|2007|Brown University|th|b|u:www.plai.org",
        "Think Data Structures|Downey|2017|Green Tea Press|th|b|u:greenteapress.com/wp/think-data-structures/",
        "Think Complexity|Downey|2016|O'Reilly, 2nd ed.|th|b|u:greenteapress.com/wp/think-complexity-2e/",
        "Introduction to Information Retrieval|Manning, Raghavan, Schütze|2008|Cambridge University Press|dl|b|u:nlp.stanford.edu/IR-book/",
        "Bayesian Methods for Hackers|Davidson-Pilon|2015|Addison-Wesley|ds|b|u:camdavidsonpilon.github.io/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers/",
        "Computational and Inferential Thinking|Adhikari, DeNero|2022|Online|ds|b|u:inferentialthinking.com",
        "Foundations of Data Science|Blum, Hopcroft, Kannan|2020|Cambridge University Press|ds|b|u:www.cs.cornell.edu/jeh/book.pdf",
        "Feature Engineering and Selection|Kuhn, Johnson|2019|CRC Press|ds|b|u:www.feat.engineering",
        "ggplot2: Elegant Graphics for Data Analysis|Wickham|2016|Springer|ds|b|u:ggplot2-book.org",
        "Mastering Shiny|Wickham|2021|O'Reilly|web|b|u:mastering-shiny.org",
        "Gaussian Processes for Machine Learning|Rasmussen, Williams|2006|MIT Press|ai|b|u:gaussianprocess.org/gpml/",
        "Algorithms for Decision Making|Kochenderfer, Wheeler, Wray|2022|MIT Press|ai|b|u:algorithmsbook.com/",
        "Machine Learning Yearning|Ng|2018|Online|ai|b|u:www.mlyearning.org",
        "Deep Learning Tuning Playbook|Godbole et al.|2023|Google Research|dl|b|u:github.com/google-research/tuning_playbook",
        "Linear Algebra|Hefferon|2020|Online, 4th ed.|math|b|u:hefferon.net/linearalgebra/",
        "Introduction to Probability|Grinstead, Snell|1997|American Mathematical Society|math|b|u:math.dartmouth.edu/~prob/prob/prob.pdf",
        "A Graduate Course in Applied Cryptography|Boneh, Shoup|2023|Online|sec|b|u:toc.cryptobook.us",
        "Building Secure and Reliable Systems|Adkins et al.|2020|O'Reilly|sec|b|u:sre.google/books/",
        "The Site Reliability Workbook|Beyer et al.|2018|O'Reilly|cloud|b|u:sre.google/workbook/table-of-contents/",
        "The Architecture of Open Source Applications|Brown, Wilson (eds.)|2011|Lulu|se|b|u:aosabook.org",
        "Dive into Systems|Matthews, Newhall, Webb|2022|No Starch Press|sys|b|u:diveintosystems.org",
        "Linux From Scratch|Beekmans|2024|Online|sys|b|u:www.linuxfromscratch.org/lfs/",
        "Think OS|Downey|2015|Green Tea Press|sys|b|u:greenteapress.com/wp/think-os/",
        "The Little Book of Semaphores|Downey|2016|Green Tea Press|sys|b|u:semaphores/",
        "Computer Science from the Bottom Up|Wienand|2009|Online|sys|b|u:www.bottomupcs.com",
        "Beej's Guide to Network Programming|Hall|2023|Online|net|b|u:beej.us/guide/bgnet/",
        "Ray Tracing in One Weekend|Shirley, Black, Hollasch|2024|Online|game|b|u:raytracing.github.io",
        "Computer Graphics from Scratch|Gambetta|2021|No Starch Press|game|b|u:gabrielgambetta.com/computer-graphics-from-scratch/",
        "The Book of Shaders|Vivo, Lowe|2015|Online|game|b|u:thebookofshaders.com",
        "The Nature of Code|Shiffman|2024|No Starch Press, 2nd ed.|game|b|u:natureofcode.com",
        "Neural Machine Translation by Jointly Learning to Align and Translate|Bahdanau, Cho, Bengio|2015|ICLR|dl|p|a:1409.0473",
        "Sequence to Sequence Learning with Neural Networks|Sutskever, Vinyals, Le|2014|NeurIPS|dl|p|a:1409.3215",
        "Playing Atari with Deep Reinforcement Learning|Mnih et al.|2013|arXiv|dl|p|a:1312.5602",
        "Proximal Policy Optimization Algorithms|Schulman et al.|2017|arXiv|dl|p|a:1707.06347",
        "Batch Normalization: Accelerating Deep Network Training|Ioffe, Szegedy|2015|ICML|dl|p|a:1502.03167",
        "Very Deep Convolutional Networks for Large-Scale Image Recognition|Simonyan, Zisserman|2015|ICLR|dl|p|a:1409.1556",
        "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale|Dosovitskiy et al.|2021|ICLR|dl|p|a:2010.11929",
        "Auto-Encoding Variational Bayes|Kingma, Welling|2014|ICLR|dl|p|a:1312.6114",
        "Learning Transferable Visual Models From Natural Language Supervision (CLIP)|Radford et al.|2021|ICML|dl|p|a:2103.00020",
        "LLaMA: Open and Efficient Foundation Language Models|Touvron et al.|2023|arXiv|dl|p|a:2302.13971",
        "Llama 2: Open Foundation and Fine-Tuned Chat Models|Touvron et al.|2023|arXiv|dl|p|a:2307.09288",
        "Direct Preference Optimization|Rafailov et al.|2023|NeurIPS|dl|p|a:2305.18290",
        "FlashAttention: Fast and Memory-Efficient Exact Attention|Dao et al.|2022|NeurIPS|dl|p|a:2205.14135",
        "GPT-4 Technical Report|OpenAI|2023|arXiv|dl|p|a:2303.08774",
        "ReAct: Synergizing Reasoning and Acting in Language Models|Yao et al.|2023|ICLR|dl|p|a:2210.03629",
        "Toolformer: Language Models Can Teach Themselves to Use Tools|Schick et al.|2023|NeurIPS|dl|p|a:2302.04761",
        "Distilling the Knowledge in a Neural Network|Hinton, Vinyals, Dean|2015|arXiv|dl|p|a:1503.02531",
        "U-Net: Convolutional Networks for Biomedical Image Segmentation|Ronneberger, Fischer, Brox|2015|MICCAI|dl|p|a:1505.04597",
        "You Only Look Once: Unified, Real-Time Object Detection|Redmon et al.|2016|CVPR|dl|p|a:1506.02640",
        "Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks|Ren, He, Girshick, Sun|2015|NeurIPS|dl|p|a:1506.01497",
        "Mask R-CNN|He, Gkioxari, Dollár, Girshick|2017|ICCV|dl|p|a:1703.06870",
        "EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks|Tan, Le|2019|ICML|dl|p|a:1905.11946",
        "MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications|Howard et al.|2017|arXiv|dl|p|a:1704.04861",
        "Layer Normalization|Ba, Kiros, Hinton|2016|arXiv|dl|p|a:1607.06450",
        "Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning|Haarnoja et al.|2018|ICML|dl|p|a:1801.01290",
        "High-Resolution Image Synthesis with Latent Diffusion Models|Rombach et al.|2022|CVPR|dl|p|a:2112.10752",
        "A Survey of Large Language Models|Zhao et al.|2023|arXiv|dl|p|a:2303.18223",
        "Meltdown: Reading Kernel Memory from User Space|Lipp et al.|2018|USENIX Security|sec|p|a:1801.01207"
      ];

      var E = [
        ["Google Scholar", "https://scholar.google.com/scholar?q="],
        ["Semantic Scholar", "https://www.semanticscholar.org/search?q="],
        ["arXiv", "https://arxiv.org/search/?searchtype=all&query="],
        ["IEEE Xplore", "https://ieeexplore.ieee.org/search/searchresult.jsp?queryText="],
        ["ACM Digital Library", "https://dl.acm.org/action/doSearch?AllField="],
        ["Open Library", "https://openlibrary.org/search?q="],
        ["Google Books", "https://www.google.com/search?tbm=bks&q="],
        ["DBLP", "https://dblp.org/search?q="],
        ["بنك المعرفة المصري EKB", "https://www.ekb.eg/"]
      ];

      var AR = {
        python: "بايثون", java: "جافا", javascript: "جافاسكريبت", "c++": "سي بلس بلس",
        rust: "راست", neural: "شبكات عصبية", network: "شبكات", security: "امن سيبراني",
        database: "قواعد بيانات", sql: "قواعد بيانات", algorithm: "خوارزميات",
        machine: "تعلم الالة", learning: "تعلم", operating: "نظم تشغيل",
        cryptography: "تشفير", web: "ويب", linux: "لينكس", data: "بيانات",
        deep: "عميق", vision: "رؤية حاسوبية", robot: "روبوت", software: "برمجيات",
        design: "تصميم", game: "العاب", cloud: "سحابة", docker: "دوكر",
        kubernetes: "كوبرنتس", artificial: "ذكاء اصطناعي", language: "لغة",
        compiler: "مترجمات", hacking: "اختراق", graphics: "رسوميات",
        distributed: "انظمة موزعة", transformer: "محولات"
      };

      var R = R0.concat(NEW).map(function (x, i) {
        var p = x.split("|");
        return { n: i, t: p[0], a: p[1], y: p[2], v: p[3], f: p[4], k: p[5], i: p[6] || "" };
      });

      var $ = function (i) { return document.getElementById(i); };

      function nm(s) {
        return String(s).toLowerCase()
          .replace(/[\u064B-\u0652\u0640]/g, "")
          .replace(/[أإآ]/g, "ا")
          .replace(/ى/g, "ي")
          .replace(/ة/g, "ه");
      }

      function esc(s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
      }

      function yr(x) {
        return parseInt(String(x.y).replace(/\D/g, "")) || 0;
      }

      R.forEach(function (r) {
        var t = r.t.toLowerCase(), x = "";
        for (var k in AR) if (t.indexOf(k) > -1) x += " " + AR[k];
        r.h = nm(r.t + " " + r.a + " " + F[r.f][0] + " " + r.v + " " + r.y + x);
      });

      var S = { r: {}, notes: {}, status: {} };
      try {
        var saved = JSON.parse(localStorage.getItem("lib7_award"));
        if (saved) S = Object.assign(S, saved);
      } catch (e) {}

      function sv() {
        try { localStorage.setItem("lib7_award", JSON.stringify(S)); } catch (e) {}
        updateGamification();
      }

      function updateGamification() {
        var savedIds = Object.keys(S.r);
        $("mcnt").textContent = savedIds.length;

        var doneCount = 0;
        for (var k in S.status) if (S.status[k] === "done") doneCount++;

        var target = 10;
        var pct = Math.min(100, (doneCount / target) * 100);
        var circumference = 81.68;
        var offset = circumference - (pct / 100) * circumference;
        $("progRing").style.strokeDashoffset = offset;

        var rank = "مستوى: باحث مبتدئ";
        if (doneCount >= 10) rank = "🏆 خبير أكاديمي (" + doneCount + ")";
        else if (doneCount >= 4) rank = "🚀 باحث متقدم (" + doneCount + "/10)";
        else if (doneCount >= 1) rank = "📘 قارئ نشط (" + doneCount + "/10)";
        $("rankLabel").textContent = rank;
      }

      function toast(m) {
        var t = $("ts");
        t.textContent = m;
        t.className = "toast on";
        clearTimeout(t._h);
        t._h = setTimeout(function () { t.className = "toast"; }, 2600);
      }

      /* 3. Spotlight Randomizer */
      function renderSpotlight() {
        var freeBooks = R.filter(function(b) { return b.i; });
        var pick = freeBooks[Math.floor(Math.random() * freeBooks.length)];
        $("spotlightCard").innerHTML =
          '<div class="sp-head">' +
          '<span>✨ ترشيح اللحظة (مفتوح المصدر)</span>' +
          '<button class="dice-btn" id="diceRoll">🎲 ادهشني بمرجع</button>' +
          '</div>' +
          '<div class="sp-body">' +
          '<div class="sp-mini-cv" style="background:linear-gradient(145deg,' + F[pick.f][1] + ',#020617)">' +
          '<span>' + F[pick.f][2] + '</span>' +
          '<span>' + esc(pick.y) + '</span>' +
          '</div>' +
          '<div class="sp-info">' +
          '<h3 dir="auto">' + esc(pick.t) + '</h3>' +
          '<p dir="auto">' + esc(pick.a) + ' · ' + F[pick.f][0] + '</p>' +
          '<div class="acts">' +
          '<a class="btn p" href="' + link(pick) + '" target="_blank" rel="noopener noreferrer" style="padding:5px 14px;">📖 اقرأ مباشرة</a>' +
          '<button class="btn" data-o="' + pick.n + '" style="background:rgba(255,255,255,0.1); color:#fff; border-color:rgba(255,255,255,0.2);">التفاصيل</button>' +
          '</div></div></div>';
      }

      var fl = "all", ty = "all", mine = false, activeRm = null, pg = 1, PS = 36;
      var TY = {
        all: "📚 جميع المصادر",
        fb: "📖 كتب متاحة مجاناً",
        fp: "📄 أبحاث مفتوحة (PDF)",
        ref: "🏛️ مراجع أكاديمية للاستعارة"
      };

      function okT(x) {
        return ty == "all" || (ty == "fb" ? x.i && x.k == "b" : ty == "fp" ? x.i && x.k == "p" : !x.i);
      }

      $("stt").innerHTML =
        "<span><b>" + R.length + "</b>مرجع منتقى</span>" +
        "<span><b>" + R.filter(function (r) { return r.i; }).length + "</b>قراءة مجانية مباشرة</span>" +
        "<span><b>" + Object.keys(F).length + "</b>تخصص تقني</span>";

      function side() {
        var c = {}, tot = 0;
        R.forEach(function (r) {
          if (okT(r)) { c[r.f] = (c[r.f] || 0) + 1; tot++; }
        });
        var h = '<button class="fb" data-g="f" data-k="all" aria-pressed="' + (fl == "all") + '"><span>✨ كل المجالات</span><i>' + tot + "</i></button>";
        var s = '<button class="chip" data-g="f" data-k="all" aria-pressed="' + (fl == "all") + '">الكل</button>';
        for (var f in F) {
          h += '<button class="fb" data-g="f" data-k="' + f + '" aria-pressed="' + (fl == f) + '"><span>' + F[f][2] + " " + F[f][0] + "</span><i>" + (c[f] || 0) + "</i></button>";
          s += '<button class="chip" data-g="f" data-k="' + f + '" aria-pressed="' + (fl == f) + '">' + F[f][2] + " " + F[f][0] + "</button>";
        }
        $("fc").innerHTML = h;
        $("fs").innerHTML = s;
        h = "";
        for (var t in TY) {
          h += '<button class="fb" data-g="t" data-k="' + t + '" aria-pressed="' + (ty == t) + '"><span>' + TY[t] + "</span></button>";
        }
        $("tc").innerHTML = h;
      }

      function link(r) {
        return r.i.slice(0, 2) == "a:" ? "https://arxiv.org/pdf/" + r.i.slice(2) : "https://" + r.i.slice(2);
      }

      var ST_LABELS = { reading: "⏳ جاري القراءة", done: "✅ تم الإنجاز" };

      function cover(x, m) {
        var t = m ? "div" : x.i ? "a" : "button";
        var at = m ? "" : x.i ? ' href="' + link(x) + '" target="_blank" rel="noopener noreferrer"' : ' data-o="' + x.n + '"';
        var st = S.status[x.n] ? '<span class="st-badge">' + ST_LABELS[S.status[x.n]] + "</span>" : "";
        return "<" + t + ' class="cv"' + at + ' data-i="' + F[x.f][2] + '" style="--c:' + F[x.f][1] + '" aria-label="' + esc(x.t) + '">' +
          (x.i ? '<span class="fr">مجاني</span><span class="rd">📖 اقرأ</span>' : "") +
          st +
          '<b dir="auto">' + esc(x.t) + '</b><small dir="auto">' + esc(x.a) + "</small></" + t + ">";
      }

      function draw() {
        var q = nm($("q").value.trim()).split(/\s+/).filter(Boolean);
        var so = $("so").value;
        var r = R.filter(function (x) {
          if (activeRm) {
            return ROADMAPS[activeRm].some(function(rt) { return x.t.toLowerCase().indexOf(rt.toLowerCase()) > -1; });
          }
          return q.every(function (w) { return x.h.indexOf(w) > -1; }) &&
            (fl == "all" || x.f == fl) &&
            okT(x) &&
            (!mine || S.r[x.n]);
        });

        if (activeRm) {
          var order = ROADMAPS[activeRm];
          r.sort(function(a, b) {
            var ia = order.findIndex(function(t) { return a.t.toLowerCase().indexOf(t.toLowerCase()) > -1; });
            var ib = order.findIndex(function(t) { return b.t.toLowerCase().indexOf(t.toLowerCase()) > -1; });
            return ia - ib;
          });
        } else {
          r.sort(function (a, b) {
            return so == "n" ? yr(b) - yr(a) :
                   so == "o" ? yr(a) - yr(b) :
                   so == "a" ? a.t.localeCompare(b.t) :
                   ((a.n * 37) % 101) - ((b.n * 37) % 101);
          });
        }

        $("cn").textContent = activeRm
          ? "🧭 عرض كتب المسار التعليمي (" + r.length + " مرجع مرتب)"
          : r.length + " نتيجة" + (fl != "all" ? " في " + F[fl][0] : "");

        $("gd").innerHTML = r.length
          ? r.slice(0, pg * PS).map(function (x, idx) {
              var delay = Math.min(idx % PS, 18) * 25;
              return '<article class="bk" style="animation-delay:' + delay + 'ms">' + cover(x) +
                '<div class="m">' + esc(x.a) + "<br>" + esc(x.y) + " · " + esc(x.v) + "</div>" +
                '<div class="acts">' +
                (x.i ? '<a class="btn p" href="' + link(x) + '" target="_blank" rel="noopener noreferrer">📖 اقرأ</a>' : "") +
                '<button class="btn" data-o="' + x.n + '">تفاصيل</button>' +
                '<button class="btn" data-a="s" data-n="' + x.n + '" aria-label="حفظ" title="حفظ في قائمتي">' + (S.r[x.n] ? "★" : "☆") + "</button>" +
                "</div></article>";
            }).join("")
          : '<div class="empty"><h3>لم نجد مراجع مطابقة تماماً 🔍</h3><p>جرّب تقليل كلمات البحث، أو تغيير فلتر "نوع المصدر" إلى "جميع المصادر"، أو ابحث في المحركات الأكاديمية بالأسفل.</p></div>';

        $("mo").hidden = r.length <= pg * PS;

        var Q = encodeURIComponent($("q").value.trim() || "Computer Science");
        $("eg").innerHTML = E.map(function (e) {
          return '<a class="btn" href="' + e[1] + (e[1].slice(-1) == "/" ? "" : Q) + '" target="_blank" rel="noopener noreferrer">' + e[0] + " ↗</a>";
        }).join("");
      }

      /* 4. Interactive 3D Parallax Book Cover Tilt & Glare */
      document.addEventListener("mousemove", function(e) {
        var bk = e.target.closest(".bk");
        if (!bk) return;
        var cv = bk.querySelector(".cv");
        if (!cv) return;
        var rect = cv.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var px = (x / rect.width) * 100;
        var py = (y / rect.height) * 100;
        var rx = ((y / rect.height) - 0.5) * -14;
        var ry = ((x / rect.width) - 0.5) * 16;
        cv.style.setProperty("--rx", rx.toFixed(2) + "deg");
        cv.style.setProperty("--ry", ry.toFixed(2) + "deg");
        cv.style.setProperty("--gx", px.toFixed(1) + "%");
        cv.style.setProperty("--gy", py.toFixed(1) + "%");
      });

      document.addEventListener("mouseout", function(e) {
        var bk = e.target.closest(".bk");
        if (!bk) return;
        var cv = bk.querySelector(".cv");
        if (!cv) return;
        cv.style.setProperty("--rx", "0deg");
        cv.style.setProperty("--ry", "0deg");
        cv.style.setProperty("--gx", "50%");
        cv.style.setProperty("--gy", "50%");
      });

      function go() { pg = 1; draw(); }
      function apa(x) { return x.a + " (" + x.y + "). " + x.t + ". " + x.v + "."; }

      function bib(x) {
        var au = x.a.replace(/ et al\./, "").split(/,\s*/).join(" and ");
        var k = (x.a.split(/[ ,]/)[0] + x.y).replace(/\W/g, "").toLowerCase();
        return "@" + (x.k == "b" ? "book" : "article") + "{" + k + ",\n  author = {" + au + (/et al/.test(x.a) ? " and others" : "") + "},\n  title = {" + x.t + "},\n  year = {" + x.y + "},\n  " + (x.k == "b" ? "publisher" : "journal") + " = {" + x.v + "}\n}";
      }

      function copy(t, m) {
        (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(
          function () { toast(m); },
          function () { toast("انسخ يدوياً: " + t.slice(0, 70)); }
        );
      }

      function openB(n) {
        var x = R[n], q = encodeURIComponent(x.t);
        var rel = R.filter(function (r) {
          return r.f == x.f && r.n != n && r.k == x.k;
        }).sort(function (a, b) {
          return Math.abs(yr(a) - yr(x)) - Math.abs(yr(b) - yr(x));
        }).slice(0, 4);

        var rd = x.i
          ? '<a class="btn p" href="' + link(x) + '" target="_blank" rel="noopener noreferrer">📖 اقرأ الكتاب الآن (PDF / Web)</a>'
          : '<a class="btn p" href="https://openlibrary.org/search?q=' + q + '" target="_blank" rel="noopener noreferrer">استعره من Open Library</a>' +
            '<a class="btn" href="https://www.google.com/search?tbm=bks&q=' + q + '" target="_blank" rel="noopener noreferrer">Google Books</a>' +
            '<a class="btn" href="https://scholar.google.com/scholar?q=' + q + '" target="_blank" rel="noopener noreferrer">Scholar</a>';

        var curSt = S.status[n] || "";
        var curNote = S.notes[n] || "";

        $("dc").innerHTML =
          '<div class="dh">' + cover(x, 1) +
          '<div style="flex:1">' +
          '<h2 dir="auto">' + esc(x.t) + "</h2>" +
          '<div class="m" style="font-size:.95rem" dir="auto">' + esc(x.a) + "</div>" +
          '<div style="margin:10px 0">' +
          '<span class="tag">📅 ' + esc(x.y) + "</span> " +
          '<span class="tag">🏛️ ' + esc(x.v) + "</span> " +
          '<span class="tag">' + F[x.f][2] + " " + F[x.f][0] + "</span> " +
          '<span class="tag">' + (x.k == "b" ? "كتاب مرجعي" : "ورقة بحثية") + "</span>" +
          (x.i ? ' <span class="tag" style="color:var(--ok); border-color:var(--ok)">✓ متاح مجاناً</span>' : "") +
          "</div>" +
          '<div class="acts">' + rd + "</div>" +
          '<div class="acts" style="margin-top:8px">' +
          '<button class="btn" data-a="s" data-n="' + n + '">' + (S.r[n] ? "★ في قائمتي" : "☆ أضف لقائمتي") + "</button>" +
          '<button class="btn" data-a="apa" data-n="' + n + '">📋 نسخ APA</button>' +
          '<button class="btn" data-a="bib" data-n="' + n + '">🔖 نسخ BibTeX</button>' +
          '<button class="btn" id="cx">✕ إغلاق</button>' +
          "</div></div></div>" +
          '<div class="user-notes">' +
          '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">' +
          '<strong>📝 متابعة القراءة وملاحظاتك:</strong>' +
          '<select id="stSel" class="ib" style="min-height:32px; padding:2px 10px; font-size:0.82rem;" data-n="' + n + '">' +
          '<option value=""' + (curSt == "" ? " selected" : "") + '>الحالة: لم يبدأ</option>' +
          '<option value="reading"' + (curSt == "reading" ? " selected" : "") + '>⏳ جاري القراءة</option>' +
          '<option value="done"' + (curSt == "done" ? " selected" : "") + '>✅ أتممت قراءته</option>' +
          "</select></div>" +
          '<textarea id="noteInp" data-n="' + n + '" placeholder="اكتب ملخصاً سريعاً، رقم الصفحة اللي وقفت عندها، أو فكرة عجبتك...">' + esc(curNote) + "</textarea>" +
          "</div>" +
          (x.i
            ? '<div class="note">💡 هذا المرجع متاح بشكل قانوني ومجاني من المؤلف أو الناشر الرسمي (Open Access).</div>'
            : '<div class="note">🔒 هذا الكتاب محمي بحقوق النشر. يمكنك معاينة فصوله عبر Google Books أو البحث عنه في مكتبة الكلية أو بنك المعرفة المصري (EKB).</div>') +
          (rel.length
            ? '<h3 style="margin:18px 0 0;font-size:1rem">📚 مراجع ذات صلة في نفس التخصص</h3><div class="rel">' +
              rel.map(function (r) { return cover(r); }).join("") + "</div>"
            : "");

        if (!$("dg").open) $("dg").showModal();
        $("dc").scrollTop = 0;

        $("stSel").onchange = function() {
          var v = this.value;
          if (v) { S.status[n] = v; S.r[n] = 1; } else { delete S.status[n]; }
          sv(); draw(); toast(v === "done" ? "🎉 عاش! تم احتساب الكتاب في إنجازك" : "تم تحديث حالة القراءة ✓");
        };

        $("noteInp").oninput = function() {
          var v = this.value.trim();
          if (v) { S.notes[n] = v; S.r[n] = 1; } else { delete S.notes[n]; }
          sv();
        };
      }

      document.addEventListener("click", function (e) {
        var t = e.target;
        if (t.id == "cx") { $("dg").close(); return; }
        if (t.id == "diceRoll") { renderSpotlight(); return; }

        var qt = t.closest("[data-qt]");
        if (qt) {
          activeRm = null;
          document.querySelectorAll(".rm-btn").forEach(function(b){ b.setAttribute("aria-pressed", "false"); });
          $("q").value = qt.dataset.qt;
          go();
          return;
        }

        var rm = t.closest("[data-rm]");
        if (rm) {
          var key = rm.dataset.rm;
          if (activeRm === key) {
            activeRm = null;
            rm.setAttribute("aria-pressed", "false");
          } else {
            activeRm = key;
            document.querySelectorAll(".rm-btn").forEach(function(b){ b.setAttribute("aria-pressed", "false"); });
            rm.setAttribute("aria-pressed", "true");
            $("q").value = "";
          }
          go();
          return;
        }

        var g = t.closest("[data-g]");
        if (g) {
          activeRm = null;
          document.querySelectorAll(".rm-btn").forEach(function(b){ b.setAttribute("aria-pressed", "false"); });
          if (g.dataset.g == "f") fl = g.dataset.k; else ty = g.dataset.k;
          side(); go(); $("sd").classList.remove("on");
          return;
        }

        var o = t.closest("[data-o]");
        if (o) { openB(+o.dataset.o); return; }

        var a = t.closest("[data-a]");
        if (a) {
          var x = R[+a.dataset.n], k = a.dataset.a;
          if (k == "s") {
            if (S.r[x.n]) { delete S.r[x.n]; toast("تمت الإزالة من قائمتك"); }
            else { S.r[x.n] = 1; toast("تم الحفظ في قائمتك ★"); }
            sv(); draw();
            if ($("dg").open) openB(x.n);
          } else if (k == "apa") copy(apa(x), "تم نسخ الاستشهاد بصيغة APA ✓");
          else if (k == "bib") copy(bib(x), "تم نسخ كود BibTeX ✓");
        }
      });

      $("dg").onclick = function (e) { if (e.target == this) this.close(); };
      $("q").oninput = function() { activeRm = null; go(); };
      $("so").onchange = go;
      $("mo").onclick = function () { pg++; draw(); };
      $("fo").onclick = function () { $("sd").classList.toggle("on"); };

      $("mb").onclick = function () {
        mine = !mine;
        activeRm = null;
        this.setAttribute("aria-pressed", mine);
        go();
      };

      $("zenBtn").onclick = function() {
        var on = document.body.classList.toggle("zen-mode");
        this.setAttribute("aria-pressed", on);
        toast(on ? "🧘 تم تفعيل وضع التركيز للمذاكرة" : "تم الخروج من وضع التركيز");
      };

      $("expBtn").onclick = function() {
        var ids = Object.keys(S.r);
        if (!ids.length) { toast("قائمتك فارغة حالياً! احفظ بعض الكتب أولاً ★"); return; }
        var txt = "📚 قائمة مراجعي من المكتبة الرقمية للحاسبات والذكاء الاصطناعي:\n=================================================\n\n";
        ids.forEach(function(id, idx) {
          var b = R[id];
          if (!b) return;
          txt += (idx + 1) + ". " + apa(b) + "\n";
          if (b.i) txt += "   الرابط المباشر: " + link(b) + "\n";
          if (S.notes[id]) txt += "   ملاحظاتي: " + S.notes[id] + "\n";
          txt += "\n";
        });
        var blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "My-CS-Library.txt";
        a.click();
        toast("تم تحميل ملف مراجعك بنجاح 📥");
      };

      $("tb").onclick = function () {
        var r = document.documentElement;
        var d = r.dataset.theme ? r.dataset.theme == "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
        r.dataset.theme = d ? "light" : "dark";
      };

      document.addEventListener("keydown", function(e) {
        if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
          e.preventDefault();
          $("q").focus();
        }
      });

      var SYNONYMS = {
        "ai": ["Artificial Intelligence", "Machine Learning", "Neural Networks", "Deep Learning", "Foundation Models"],
        "الذكاء": ["Artificial Intelligence", "Machine Learning", "Cognitive Computing", "Intelligent Systems"],
        "بايثون": ["Python Programming", "Scientific Computing", "Data Science with Python", "PyTorch"],
        "python": ["Python Programming", "Data Analysis", "SciPy Ecosystem", "Asyncio"],
        "تشفير": ["Cryptography", "Public-Key Infrastructure", "Network Security", "Zero-Knowledge Proofs"],
        "security": ["Cybersecurity", "Applied Cryptography", "Vulnerability Analysis", "Threat Modeling"],
        "خوارزميات": ["Algorithms", "Data Structures", "Computational Complexity", "Graph Theory"],
        "algorithm": ["Algorithm Design", "Dynamic Programming", "Asymptotic Analysis", "NP-Completeness"],
        "شبكات": ["Computer Networks", "TCP/IP Protocol", "Distributed Systems", "Routing Algorithms"],
        "بيانات": ["Database Internals", "Data Engineering", "Distributed Storage", "SQL Optimization"]
      };

      $("ai").onclick = function () {
        var raw = $("q").value.trim();
        var o = $("aio");
        o.hidden = false;
        if (!raw) {
          o.innerHTML = '<span style="color:var(--warn)">⚠️ اكتب أي موضوع في شريط البحث بالأعلى أولاً (مثلاً: تشفير، Python، خوارزميات) ثم اضغط هنا.</span>';
          return;
        }
        var lower = raw.toLowerCase();
        var suggestions = [raw + " survey", raw + " state of the art", raw + " architecture", raw + " benchmark"];
        for (var k in SYNONYMS) {
          if (lower.indexOf(k) > -1) suggestions = SYNONYMS[k].concat(suggestions);
        }
        suggestions = suggestions.filter(function(item, pos) { return suggestions.indexOf(item) == pos; }).slice(0, 8);

        o.innerHTML = '<div>💡 <strong>كلمات مفتاحية مقترحة للبحث في Google Scholar و IEEE</strong> (اضغط على أي كلمة للبحث بها):</div>' +
          '<div class="kw-list">' +
          suggestions.map(function(s) {
            return '<button class="kw-chip" data-qt="' + esc(s) + '">' + esc(s) + ' +</button>';
          }).join("") +
          '</div>';
      };

      renderSpotlight();
      updateGamification();
      side();
      draw();
