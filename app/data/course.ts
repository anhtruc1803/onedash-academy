import type { Chapter } from "../types/course";

export const chapters: Chapter[] = [
  {
    id: "tong-quan",
    number: 1,
    shortTitle: "Khám phá OneDash",
    title: "Tổng quan về OneDash",
    description: "Hiểu vai trò của một bảng điều khiển tập trung trước khi chạm vào máy chủ.",
    objectives: [
      "Mô tả đúng OneDash và vấn đề nền tảng giải quyết.",
      "Nhận diện nhóm người dùng và bốn khu vực vận hành chính.",
      "Phân biệt dữ liệu quan sát với hành động có thể thay đổi hệ thống.",
    ],
    lessons: [
      {
        id: "tong-quan-1",
        title: "Một giao diện cho nhiều máy chủ",
        summary: "OneDash tập trung quản lý, vận hành và giám sát server thay cho nhiều công cụ rời rạc.",
        paragraphs: [
          "OneDash là nền tảng quản trị server tập trung do iNET phát triển. Người vận hành có thể theo dõi nhiều máy Linux và Windows trên cùng một giao diện thay vì ghi nhớ từng IP, SSH key và công cụ kết nối riêng.",
          "Giá trị cốt lõi không nằm ở một biểu đồ đơn lẻ, mà ở việc đưa trạng thái, truy cập từ xa, bảo vệ SSH và tác vụ lặp lại về một luồng làm việc chung.",
        ],
        example: "Một ca trực có web-prod-01, win-ad-02 và db-staging. Người trực bắt đầu từ dashboard chung để biết máy nào cần chú ý trước khi mở terminal hoặc RDP.",
      },
      {
        id: "tong-quan-2",
        title: "Bài toán OneDash giải quyết",
        summary: "Giảm phân mảnh khi truy cập, giám sát và bảo vệ hạ tầng nhiều máy chủ.",
        paragraphs: [
          "Khi mỗi server dùng một cách đăng nhập, một bộ chỉ số và một nơi lưu lịch sử riêng, đội vận hành khó nhìn thấy quan hệ giữa triệu chứng và nguyên nhân. OneDash gom các tín hiệu đó về dashboard trung tâm.",
          "Nền tảng công khai mô tả Web Terminal, Remote Desktop, giám sát tài nguyên theo thời gian thực, quản lý SSH key, phát hiện brute-force, audit log và Command Templates.",
        ],
        note: "Dashboard tập trung không thay thế quy trình phê duyệt thay đổi. Luôn phân biệt thao tác quan sát và thao tác gây tác động.",
      },
      {
        id: "tong-quan-3",
        title: "Ai dùng và dùng theo trình tự nào",
        summary: "Phù hợp với quản trị hệ thống, DevOps và đội vận hành nhiều máy Linux/Windows.",
        paragraphs: [
          "Người dùng phù hợp gồm quản trị viên hệ thống, kỹ sư DevOps, đội vận hành và các nhóm cần quản lý hạ tầng nhiều môi trường như Production, Staging và Dev.",
          "Một trình tự an toàn thường là: xem tổng quan → lọc máy chủ → đọc chỉ số và cảnh báo → mở chi tiết → chọn hành động phù hợp → kiểm tra kết quả và audit log.",
        ],
      },
    ],
    scenario: "Ca trực sáng nhận thông báo có hai cảnh báo. Thay vì mở ngay SSH vào từng máy, bạn kiểm tra dashboard, xác định mức độ và chỉ mở công cụ truy cập khi đã biết mục tiêu.",
    importantNote: "Các số liệu trong Academy là dữ liệu mô phỏng. Không có kết nối tới OneDash thật hoặc server thật.",
    checklist: [
      "Bắt đầu từ dashboard chung.",
      "Xác định môi trường và hệ điều hành.",
      "Đọc trạng thái trước khi hành động.",
      "Kiểm tra kết quả sau mọi thay đổi.",
    ],
    quiz: [
      {
        id: "q1-1",
        prompt: "Mục tiêu chính của OneDash là gì?",
        options: [
          { label: "Quản trị nhiều server trên một giao diện tập trung", rationale: "Đúng. Đây là mô tả cốt lõi trên website OneDash." },
          { label: "Thay thế hoàn toàn mọi quy trình phê duyệt", rationale: "Sai. Nền tảng hỗ trợ vận hành, không xóa bỏ trách nhiệm và quy trình kiểm soát thay đổi." },
          { label: "Chỉ quản lý máy Linux", rationale: "Sai. OneDash công khai hỗ trợ cả Linux và Windows Server." },
        ],
        correctIndex: 0,
      },
      {
        id: "q1-2",
        prompt: "Bước đầu tiên hợp lý trong một ca trực là gì?",
        options: [
          { label: "Mở terminal trên mọi máy", rationale: "Sai. Việc này tạo thêm rủi ro và chưa giúp ưu tiên sự cố." },
          { label: "Xem dashboard và cảnh báo tổng quan", rationale: "Đúng. Tổng quan giúp chọn đúng máy và đúng hành động." },
          { label: "Khởi động lại máy có CPU cao nhất", rationale: "Sai. CPU cao chỉ là một tín hiệu, chưa phải chẩn đoán." },
        ],
        correctIndex: 1,
      },
      {
        id: "q1-3",
        prompt: "Nhóm nào phù hợp nhất với OneDash?",
        options: [
          { label: "Đội vận hành nhiều máy chủ và môi trường", rationale: "Đúng. OneDash hướng tới quản trị hệ thống tập trung." },
          { label: "Người chỉ cần soạn tài liệu", rationale: "Sai. Đây không phải công cụ soạn thảo." },
          { label: "Người dùng không quản lý hạ tầng", rationale: "Sai. Các luồng chính đều xoay quanh server và vận hành." },
        ],
        correctIndex: 0,
      },
      {
        id: "q1-4",
        prompt: "Điều nào là quan sát, chưa phải thay đổi hệ thống?",
        options: [
          { label: "Đọc CPU, RAM và trạng thái dịch vụ", rationale: "Đúng. Đây là bước thu thập tín hiệu." },
          { label: "Chạy lệnh khởi động lại", rationale: "Sai. Lệnh này thay đổi trạng thái dịch vụ." },
          { label: "Chặn một địa chỉ IP", rationale: "Sai. Đây là hành động bảo mật có tác động." },
        ],
        correctIndex: 0,
      },
    ],
    practice: {
      title: "Nhiệm vụ 01 · Đọc bàn điều khiển",
      brief: "Mở đủ bốn khu vực Máy chủ, Sức khỏe, Dịch vụ và Tài nguyên để hoàn thành bản đồ giao diện.",
      success: "Bạn đã biết bắt đầu từ đâu trước khi thao tác sâu hơn.",
    },
  },
  {
    id: "ket-noi",
    number: 2,
    shortTitle: "Kết nối máy chủ",
    title: "Kết nối và quản lý máy chủ",
    description: "Chuẩn bị đúng dữ liệu, thêm máy an toàn và đọc trạng thái kết nối.",
    objectives: [
      "Nêu các điều kiện cần chuẩn bị trước khi thêm server.",
      "Mô tả quy trình kết nối Linux và Windows ở mức tổng quan.",
      "Nhận diện thông tin nhạy cảm không được đưa vào mô phỏng.",
    ],
    lessons: [
      {
        id: "ket-noi-1",
        title: "Chuẩn bị trước khi thêm server",
        summary: "Biết tên máy, hệ điều hành, môi trường và quyền được phê duyệt trước khi kết nối.",
        paragraphs: [
          "Trước khi thêm server, cần xác nhận máy thuộc môi trường nào, chạy Linux hay Windows và ai chịu trách nhiệm. Tên máy rõ ràng như web-prod-01 giúp giảm nhầm lẫn hơn tên chung chung.",
          "Website OneDash nêu khả năng import danh sách qua CSV, JSON hoặc XLSX; Agent được cài qua SSH với Linux hoặc WinRM với Windows. Academy chỉ mô phỏng quyết định, không thực hiện các bước này.",
        ],
      },
      {
        id: "ket-noi-2",
        title: "Quy trình thêm máy chủ",
        summary: "Chọn hệ điều hành, khai báo metadata, xác minh máy đích và theo dõi quá trình kết nối.",
        paragraphs: [
          "Một quy trình tốt gồm: tạo bản ghi máy → chọn hệ điều hành → kiểm tra phương thức kết nối được phê duyệt → xác minh danh tính máy → theo dõi Agent hoặc kết nối ban đầu → kiểm tra chỉ số đầu tiên.",
          "Nếu thêm nhiều máy, nên dùng mẫu import được kiểm soát và thử trước với nhóm nhỏ. Tránh nhập hàng loạt khi chưa chuẩn hóa tên, tag và môi trường.",
        ],
        example: "db-staging phải được gắn Staging ngay từ đầu để không bị chọn nhầm trong một tác vụ dành cho Production.",
      },
      {
        id: "ket-noi-3",
        title: "Thông tin kết nối và trạng thái",
        summary: "Giữ credential ngoài tài liệu học và đọc trạng thái theo nhiều tín hiệu.",
        paragraphs: [
          "Không chụp, dán hoặc gửi mật khẩu, private key hay token vào tài liệu đào tạo. Academy không có trường nhập credential và không gửi dữ liệu ra ngoài.",
          "Trạng thái Online cho biết hệ thống đang nhận tín hiệu; Offline cần đọc thêm lý do. Website OneDash mô tả khả năng phân loại nguyên nhân Agent offline, giúp tránh kết luận nhầm máy đã tắt.",
        ],
        note: "Offline có thể là mất mạng, Agent dừng hoặc máy tắt. Không khởi động lại trước khi biết nguyên nhân.",
      },
    ],
    scenario: "Bạn cần thêm api-service-01 vào môi trường Production. Metadata đã duyệt, nhưng credential phải được xử lý trong quy trình thật — không nhập vào Academy.",
    importantNote: "Không dùng IP, tài khoản, mật khẩu, private key hoặc token thật trong bất kỳ bài tập nào.",
    checklist: [
      "Tên máy phản ánh vai trò và môi trường.",
      "Xác nhận Linux hay Windows.",
      "Dùng quyền và phương thức đã phê duyệt.",
      "Xác minh trạng thái sau khi thêm.",
    ],
    quiz: [
      {
        id: "q2-1",
        prompt: "Thông tin nào phù hợp để dùng trong Academy?",
        options: [
          { label: "Tên giả lập api-service-01", rationale: "Đúng. Đây là dữ liệu mô phỏng, không phải credential." },
          { label: "Private key Production", rationale: "Sai. Private key là thông tin nhạy cảm." },
          { label: "Mật khẩu quản trị thật", rationale: "Sai. Academy không yêu cầu hoặc lưu mật khẩu." },
        ],
        correctIndex: 0,
      },
      {
        id: "q2-2",
        prompt: "OneDash công khai mô tả Agent Windows được cài qua phương thức nào?",
        options: [
          { label: "WinRM", rationale: "Đúng. Website OneDash mô tả cài Agent Windows qua WinRM." },
          { label: "Chỉ qua SSH", rationale: "Sai. SSH là luồng gắn với Linux trong mô tả bắt đầu sử dụng." },
          { label: "Qua email", rationale: "Sai. Email không phải phương thức cài Agent." },
        ],
        correctIndex: 0,
      },
      {
        id: "q2-3",
        prompt: "Vì sao phải gắn môi trường khi thêm máy?",
        options: [
          { label: "Để giảm chọn nhầm khi lọc và chạy tác vụ", rationale: "Đúng. Phân nhóm Production, Staging, Dev là một chức năng được OneDash công khai mô tả." },
          { label: "Để CPU chạy nhanh hơn", rationale: "Sai. Tag không trực tiếp thay đổi tài nguyên máy." },
          { label: "Để bỏ qua kiểm tra quyền", rationale: "Sai. Metadata không thay thế phân quyền." },
        ],
        correctIndex: 0,
      },
      {
        id: "q2-4",
        prompt: "Khi một Agent báo Offline, nên làm gì trước?",
        options: [
          { label: "Đọc lý do và các tín hiệu liên quan", rationale: "Đúng. Offline có nhiều nguyên nhân khác nhau." },
          { label: "Xóa máy khỏi hệ thống", rationale: "Sai. Đây là hành động vội vàng và làm mất ngữ cảnh." },
          { label: "Khởi động lại ngay", rationale: "Sai. Chưa có đủ chẩn đoán để thay đổi hệ thống." },
        ],
        correctIndex: 0,
      },
    ],
    practice: {
      title: "Nhiệm vụ 02 · Thêm server giả lập",
      brief: "Chọn tên máy, hệ điều hành và môi trường; không có trường credential hoặc kết nối thật.",
      success: "Server giả lập đã xuất hiện trên dashboard với metadata rõ ràng.",
    },
  },
  {
    id: "giam-sat",
    number: 3,
    shortTitle: "Giám sát sức khỏe",
    title: "Giám sát và sức khỏe hệ thống",
    description: "Đọc CPU, RAM, Disk, uptime và ưu tiên cảnh báo theo mức ảnh hưởng.",
    objectives: [
      "Giải thích ý nghĩa của CPU, RAM, Disk và uptime.",
      "Kết hợp chỉ số tài nguyên với trạng thái dịch vụ.",
      "Ưu tiên sự cố có dấu hiệu bảo mật hoặc ảnh hưởng dịch vụ.",
    ],
    lessons: [
      {
        id: "giam-sat-1",
        title: "Bốn chỉ số nền tảng",
        summary: "CPU, RAM, Disk và uptime là tín hiệu khởi đầu, không phải kết luận cuối cùng.",
        paragraphs: [
          "CPU phản ánh mức xử lý, RAM phản ánh bộ nhớ đang dùng, Disk cho biết dung lượng lưu trữ và uptime cho biết thời gian máy hoạt động. OneDash công khai hiển thị tài nguyên theo thời gian thực và lưu lịch sử để phân tích.",
          "Một giá trị cao trong vài giây có thể bình thường. Xu hướng kéo dài, nhiều chỉ số cùng xấu hoặc dịch vụ gián đoạn mới làm mức ưu tiên tăng.",
        ],
      },
      {
        id: "giam-sat-2",
        title: "Trạng thái dịch vụ và cảnh báo",
        summary: "Đọc chỉ số cùng trạng thái dịch vụ, mạng và Agent.",
        paragraphs: [
          "Dịch vụ có thể dừng dù CPU thấp; Agent có thể Offline do mạng dù máy vẫn chạy. Vì vậy người vận hành cần mở chi tiết cảnh báo, thời điểm và phạm vi ảnh hưởng.",
          "Website OneDash mô tả cảnh báo real-time và khả năng gửi thông báo qua Telegram hoặc Email cho sshwatch. Trong Academy, mọi cảnh báo chỉ nằm trong trình duyệt.",
        ],
        example: "win-ad-02 có RAM cao nhưng vẫn Online; db-staging Offline vì network timeout. Hai tình huống cần cách xác minh khác nhau.",
      },
      {
        id: "giam-sat-3",
        title: "Ưu tiên xử lý sự cố",
        summary: "Đánh giá an toàn, ảnh hưởng, phạm vi và khả năng lan rộng trước.",
        paragraphs: [
          "Một cảnh báo brute-force đang diễn ra có thể cần ưu tiên cao vì rủi ro bảo mật tăng theo thời gian. Tiếp theo là gián đoạn dịch vụ Production, rồi cảnh báo dung lượng chưa gây ảnh hưởng.",
          "Hành động đầu tiên nên giảm rủi ro mà vẫn bảo toàn bằng chứng: xác nhận nguồn, phạm vi và chọn biện pháp được phép. Luôn kiểm tra audit log sau thao tác.",
        ],
        note: "Không dựa vào màu sắc đơn lẻ. Hãy đọc nhãn mức độ, mô tả và thời điểm.",
      },
    ],
    scenario: "Dashboard đồng thời báo brute-force trên web-prod-01, RAM cao trên win-ad-02 và một bản backup vừa hoàn tất. Bạn phải ưu tiên cảnh báo có rủi ro đang tăng.",
    importantNote: "Ngưỡng cảnh báo thực tế phụ thuộc hệ thống. Academy không đặt ngưỡng kỹ thuật thay cho quy chuẩn nội bộ.",
    checklist: [
      "Đọc xu hướng, không chỉ một thời điểm.",
      "Ghép chỉ số với trạng thái dịch vụ.",
      "Ưu tiên an toàn và ảnh hưởng người dùng.",
      "Xác minh kết quả và audit log.",
    ],
    quiz: [
      {
        id: "q3-1",
        prompt: "CPU cao trong vài giây có luôn là sự cố không?",
        options: [
          { label: "Không, cần xem xu hướng và ảnh hưởng", rationale: "Đúng. Một mẫu đơn lẻ chưa đủ để kết luận." },
          { label: "Có, phải restart ngay", rationale: "Sai. Restart khi chưa chẩn đoán có thể làm gián đoạn và mất bằng chứng." },
          { label: "Có, nhưng chỉ trên Windows", rationale: "Sai. Cách đọc xu hướng áp dụng cho cả Linux và Windows." },
        ],
        correctIndex: 0,
      },
      {
        id: "q3-2",
        prompt: "Cảnh báo nào nên ưu tiên trong tình huống bài học?",
        options: [
          { label: "Brute-force SSH đang diễn ra", rationale: "Đúng. Rủi ro bảo mật đang tăng và có khả năng lan rộng." },
          { label: "Backup đã hoàn tất", rationale: "Sai. Đây là trạng thái thành công, không phải sự cố." },
          { label: "Một spike CPU ngắn", rationale: "Sai. Chưa có bằng chứng ảnh hưởng kéo dài." },
        ],
        correctIndex: 0,
      },
      {
        id: "q3-3",
        prompt: "Agent Offline luôn có nghĩa máy đã tắt?",
        options: [
          { label: "Không, có thể do mạng hoặc Agent", rationale: "Đúng. OneDash mô tả phân loại lý do offline để tránh chẩn đoán nhầm." },
          { label: "Có, luôn luôn", rationale: "Sai. Đây là kết luận quá sớm." },
          { label: "Chỉ khi Disk đầy", rationale: "Sai. Offline không đồng nghĩa một nguyên nhân duy nhất." },
        ],
        correctIndex: 0,
      },
      {
        id: "q3-4",
        prompt: "Sau khi xử lý cảnh báo, cần làm gì?",
        options: [
          { label: "Kiểm tra trạng thái mới và audit log", rationale: "Đúng. Cần xác nhận hành động có hiệu quả và được ghi nhận." },
          { label: "Đóng trình duyệt ngay", rationale: "Sai. Chưa xác nhận được kết quả." },
          { label: "Xóa lịch sử cảnh báo", rationale: "Sai. Lịch sử là dữ liệu phục vụ điều tra và cải tiến." },
        ],
        correctIndex: 0,
      },
    ],
    practice: {
      title: "Nhiệm vụ 03 · Ưu tiên cảnh báo",
      brief: "Chọn cảnh báo cần xử lý trước và thực hiện hành động giảm rủi ro trong mô phỏng.",
      success: "Cảnh báo bảo mật đã được xử lý trước các tín hiệu ít khẩn cấp hơn.",
    },
  },
  {
    id: "bao-mat",
    number: 4,
    shortTitle: "Bảo mật & người dùng",
    title: "Bảo mật và quản lý người dùng",
    description: "Áp dụng quyền tối thiểu, bảo vệ thông tin xác thực và đọc dấu vết audit.",
    objectives: [
      "Áp dụng nguyên tắc phân quyền tối thiểu.",
      "Phân biệt vai trò quan sát và vai trò thao tác.",
      "Hoàn thành checklist bảo mật cơ bản.",
    ],
    lessons: [
      {
        id: "bao-mat-1",
        title: "Quyền tối thiểu",
        summary: "Mỗi người chỉ có quyền đủ cho công việc hiện tại.",
        paragraphs: [
          "Người chỉ theo dõi chỉ số không cần quyền chạy lệnh. Người vận hành có thể cần thao tác trên một nhóm máy, nhưng không mặc định cần quyền quản trị toàn bộ.",
          "Phân quyền theo vai trò và phạm vi giúp giảm tác động khi tài khoản bị lộ hoặc khi người dùng chọn nhầm máy.",
        ],
      },
      {
        id: "bao-mat-2",
        title: "SSH key, danh tính máy và audit",
        summary: "Quản lý key tập trung, xác minh máy đích và lưu dấu vết thao tác.",
        paragraphs: [
          "OneDash công khai mô tả quản lý SSH key tập trung, xác minh danh tính server, theo dõi đăng nhập SSH và audit log. Các cơ chế này giúp biết ai đã làm gì, ở đâu và khi nào.",
          "Không dùng chung tài khoản root hoặc sao chép private key qua kênh không kiểm soát. Khi nhân sự đổi vai trò, quyền cũ cần được rà soát và thu hồi.",
        ],
        example: "Nhân sự trực theo dõi dashboard có thể dùng vai trò quan sát; chỉ người được phân công mới mở Web Terminal hoặc chặn IP.",
      },
      {
        id: "bao-mat-3",
        title: "Checklist bảo mật ca trực",
        summary: "Rà soát quyền, credential, cảnh báo và audit theo một nhịp cố định.",
        paragraphs: [
          "Đầu ca: kiểm tra cảnh báo mới và tài khoản bất thường. Trong ca: dùng đúng vai trò, không chia sẻ credential, xác minh máy trước khi thao tác. Cuối ca: xem audit log và bàn giao việc đang mở.",
          "Với brute-force, website OneDash nêu khả năng phát hiện và chặn IP một click. Hành động thật vẫn phải theo chính sách của tổ chức.",
        ],
        note: "Audit log không thay thế phân quyền; nó bổ sung khả năng truy vết và học từ sự cố.",
      },
    ],
    scenario: "Một cộng tác viên chỉ cần xem dashboard trong ba ngày. Cấp quyền quan sát có thời hạn phù hợp hơn chia sẻ tài khoản quản trị.",
    importantNote: "Không đưa credential thật vào chat, tài liệu, ảnh chụp hoặc Academy.",
    checklist: [
      "Cấp quyền theo vai trò và phạm vi.",
      "Không dùng chung tài khoản root.",
      "Quản lý SSH key tập trung.",
      "Rà soát audit log và thu hồi quyền cũ.",
    ],
    quiz: [
      {
        id: "q4-1",
        prompt: "Quyền tối thiểu nghĩa là gì?",
        options: [
          { label: "Chỉ cấp quyền đủ để hoàn thành nhiệm vụ", rationale: "Đúng. Quyền phải bám theo vai trò và phạm vi công việc." },
          { label: "Mọi người đều có quyền admin", rationale: "Sai. Điều này tăng rủi ro và phạm vi ảnh hưởng." },
          { label: "Không ai được xem dashboard", rationale: "Sai. Quyền tối thiểu không có nghĩa từ chối mọi quyền." },
        ],
        correctIndex: 0,
      },
      {
        id: "q4-2",
        prompt: "Cách nào phù hợp cho cộng tác viên chỉ cần xem?",
        options: [
          { label: "Vai trò quan sát có phạm vi và thời hạn", rationale: "Đúng. Quyền phù hợp đúng nhu cầu và dễ thu hồi." },
          { label: "Chia sẻ tài khoản root", rationale: "Sai. Không có danh tính riêng và phạm vi quyền quá rộng." },
          { label: "Gửi private key qua chat", rationale: "Sai. Đây là cách truyền credential không an toàn." },
        ],
        correctIndex: 0,
      },
      {
        id: "q4-3",
        prompt: "Audit log giúp gì?",
        options: [
          { label: "Truy vết ai làm gì và khi nào", rationale: "Đúng. Đây là giá trị chính của audit." },
          { label: "Tự động cấp mọi quyền", rationale: "Sai. Audit ghi nhận, không phải cơ chế cấp quyền." },
          { label: "Thay thế hoàn toàn xác thực", rationale: "Sai. Audit là lớp bổ sung, không thay thế xác thực." },
        ],
        correctIndex: 0,
      },
      {
        id: "q4-4",
        prompt: "Khi nhân sự đổi vai trò, cần làm gì?",
        options: [
          { label: "Rà soát và thu hồi quyền không còn cần", rationale: "Đúng. Quyền phải theo vai trò hiện tại." },
          { label: "Giữ toàn bộ quyền cũ", rationale: "Sai. Quyền tích lũy làm tăng rủi ro." },
          { label: "Dùng chung một tài khoản mới", rationale: "Sai. Tài khoản dùng chung làm mất khả năng truy vết." },
        ],
        correctIndex: 0,
      },
    ],
    practice: {
      title: "Nhiệm vụ 04 · Checklist quyền tối thiểu",
      brief: "Chọn ba biện pháp đúng và loại bỏ phương án dùng chung tài khoản root.",
      success: "Bạn đã tạo một baseline bảo mật có thể kiểm tra lại.",
    },
  },
  {
    id: "van-hanh",
    number: 5,
    shortTitle: "Vận hành & tự động hóa",
    title: "Vận hành và tự động hóa",
    description: "Dùng Command Templates có kiểm soát, theo dõi kết quả và xử lý tác vụ thất bại.",
    objectives: [
      "Lập nhịp vận hành định kỳ.",
      "Mô tả lợi ích và rủi ro của Command Templates.",
      "Đọc kết quả theo từng host và xử lý lỗi có kiểm soát.",
    ],
    lessons: [
      {
        id: "van-hanh-1",
        title: "Công việc vận hành định kỳ",
        summary: "Kiểm tra sức khỏe, cảnh báo, cập nhật và bản sao lưu theo lịch.",
        paragraphs: [
          "Nhịp vận hành có thể gồm rà soát cảnh báo, theo dõi tài nguyên, kiểm tra dịch vụ, xác nhận backup và cập nhật theo cửa sổ bảo trì. Mỗi việc cần người chịu trách nhiệm và bằng chứng hoàn tất.",
          "Không gộp tất cả thay đổi vào một thao tác lớn. Nhóm theo mức rủi ro và chạy thử trên phạm vi nhỏ trước.",
        ],
      },
      {
        id: "van-hanh-2",
        title: "Command Templates",
        summary: "Lưu mẫu lệnh, chạy trên một hoặc nhiều server và theo dõi kết quả theo thời gian thực.",
        paragraphs: [
          "OneDash công khai mô tả Command Templates cho phép tạo mẫu lệnh và chạy trên nhiều server. Cách làm này giảm gõ lặp nhưng làm phạm vi tác động lớn hơn nếu chọn sai đích.",
          "Trước khi chạy, kiểm tra tên template, nội dung lệnh, nhóm máy đích, quyền người chạy và phương án quay lui.",
        ],
        example: "Restart Nginx nên được thử trên một host Staging trước khi áp dụng cho nhóm Production, nếu quy trình nội bộ yêu cầu.",
      },
      {
        id: "van-hanh-3",
        title: "Khi tác vụ thất bại",
        summary: "Đọc log theo host, tách lỗi nhất thời khỏi lỗi cấu hình và chỉ chạy lại phần cần thiết.",
        paragraphs: [
          "Một tác vụ hàng loạt có thể thành công trên vài host và thất bại trên host khác. Không chạy lại toàn bộ theo phản xạ; hãy đọc kết quả từng máy và giữ lại bằng chứng lỗi.",
          "Nếu lỗi do dịch vụ chưa sẵn sàng, xác minh trạng thái rồi chạy lại host thất bại. Nếu lỗi do quyền hoặc cấu hình, dừng và sửa nguyên nhân trước.",
        ],
        note: "Cảnh báo lệnh nguy hiểm trên Agent là lớp bảo vệ, không phải lý do để bỏ qua review lệnh.",
      },
    ],
    scenario: "Template Restart Nginx thành công trên web-prod-01 nhưng api-service-01 chưa phản hồi. Bạn đọc log, kiểm tra trạng thái và chỉ chạy lại host thất bại.",
    importantNote: "Academy không thực thi lệnh thật. Mọi kết quả xuất hiện ngay trên trình duyệt là giả lập.",
    checklist: [
      "Review template và phạm vi đích.",
      "Thử với nhóm nhỏ khi phù hợp.",
      "Theo dõi kết quả từng host.",
      "Đọc log trước khi chạy lại.",
    ],
    quiz: [
      {
        id: "q5-1",
        prompt: "Lợi ích chính của Command Templates là gì?",
        options: [
          { label: "Chuẩn hóa lệnh lặp và theo dõi kết quả", rationale: "Đúng. Đây là năng lực OneDash công khai mô tả." },
          { label: "Loại bỏ nhu cầu review lệnh", rationale: "Sai. Tự động hóa làm review càng quan trọng." },
          { label: "Đảm bảo mọi host luôn thành công", rationale: "Sai. Tác vụ vẫn có thể thất bại trên từng host." },
        ],
        correctIndex: 0,
      },
      {
        id: "q5-2",
        prompt: "Trước khi chạy hàng loạt, cần kiểm tra gì?",
        options: [
          { label: "Template, máy đích, quyền và rollback", rationale: "Đúng. Bốn điểm này kiểm soát phạm vi và khả năng phục hồi." },
          { label: "Chỉ màu của nút Chạy", rationale: "Sai. Màu không thay thế thông tin kỹ thuật và quyền." },
          { label: "Không cần kiểm tra nếu đã chạy hôm qua", rationale: "Sai. Trạng thái và phạm vi có thể đã thay đổi." },
        ],
        correctIndex: 0,
      },
      {
        id: "q5-3",
        prompt: "Một host thất bại trong tác vụ hàng loạt. Bước phù hợp là gì?",
        options: [
          { label: "Đọc log và xác minh host đó trước khi chạy lại", rationale: "Đúng. Xử lý theo nguyên nhân và phạm vi nhỏ nhất." },
          { label: "Chạy lại toàn bộ ngay", rationale: "Sai. Có thể lặp lại tác động trên các host đã thành công." },
          { label: "Xóa kết quả thất bại", rationale: "Sai. Kết quả là bằng chứng cần cho chẩn đoán." },
        ],
        correctIndex: 0,
      },
      {
        id: "q5-4",
        prompt: "Academy thực thi template ở đâu?",
        options: [
          { label: "Không ở đâu; kết quả chỉ là mô phỏng cục bộ", rationale: "Đúng. Không có kết nối tới server thật." },
          { label: "Trên web-prod-01 thật", rationale: "Sai. Tên máy chỉ là dữ liệu giả lập." },
          { label: "Trên tài khoản OneDash của người học", rationale: "Sai. Academy không đăng nhập hoặc kết nối tài khoản." },
        ],
        correctIndex: 0,
      },
    ],
    practice: {
      title: "Nhiệm vụ 05 · Khôi phục tác vụ lỗi",
      brief: "Chạy template mô phỏng, đọc log host lỗi và chỉ chạy lại sau khi kiểm tra trạng thái.",
      success: "Bạn đã xử lý lỗi theo host thay vì chạy lại mù quáng.",
    },
  },
];

export const courseSource = {
  label: "Nguồn sản phẩm công khai: onedash.vn",
  href: "https://onedash.vn/",
  reviewedAt: "20/07/2026",
};

