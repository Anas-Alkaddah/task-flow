# TaskFlow - Kanban Board Application

تطبيق Kanban Board احترافي مبني بـ React و Tailwind CSS مع بنية معمارية نظيفة ومنظمة.

## 🏗️ البنية المعمارية (Architecture)

### 📁 هيكل المشروع

```
src/
├── components/          # المكونات المنفصلة
│   ├── Sidebar.jsx     # القائمة الجانبية
│   ├── Navbar.jsx      # شريط التنقل العلوي
│   ├── Board.jsx       # لوحة Kanban الرئيسية
│   ├── Column.jsx      # عمود المهام
│   ├── TaskCard.jsx    # بطاقة المهمة
│   ├── Modal.jsx       # مودال عام
│   ├── TaskModal.jsx   # مودال المهام
│   ├── ColumnModal.jsx # مودال الأعمدة
│   └── BoardModal.jsx  # مودال Boards
│
├── hooks/              # Custom Hooks
│   ├── useKanbanData.js    # إدارة البيانات و localStorage
│   ├── useDragAndDrop.js   # منطق السحب والإفلات
│   └── useModals.js        # إدارة المودالات
│
├── utils/              # الأدوات المساعدة
│   └── initialData.js  # البيانات الأولية
│
├── App.jsx             # المكون الرئيسي (نظيف ومنظم)
├── main.jsx            # نقطة الدخول
└── index.css           # الأنماط العامة
```

## 🎯 المبادئ المتبعة

### 1. **فصل المنطق عن العرض (Separation of Concerns)**
- **Custom Hooks**: كل منطق معقد تم فصله في Custom Hooks
  - `useKanbanData`: يدير البيانات والـ state
  - `useDragAndDrop`: يدير منطق السحب والإفلات
  - `useModals`: يدير حالات المودالات

### 2. **Component-Based Architecture**
- كل قسم من الـ UI في مكون منفصل
- المكونات قابلة لإعادة الاستخدام (Reusable)
- Props واضحة ومحددة

### 3. **Modern Tailwind CSS Setup**
- استخدام `@tailwindcss/vite` plugin (الطريقة الحديثة)
- `@import "tailwindcss"` بدلاً من `@tailwind` directives
- CSS نظيف بدون `@apply` (vanilla CSS)

## 🚀 التقنيات المستخدمة

- **React 19** - مكتبة UI
- **Vite 7** - Build tool سريع
- **Tailwind CSS v4** - Styling (الإصدار الأحدث)
- **@hello-pangea/dnd** - Drag and Drop
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📦 التثبيت والتشغيل

```bash
# تثبيت المكتبات
npm install

# تشغيل المشروع
npm run dev

# بناء للإنتاج
npm run build
```

## 🎨 الميزات

- ✅ إنشاء Boards متعددة
- ✅ إضافة وحذف الأعمدة
- ✅ إضافة وتعديل وحذف المهام
- ✅ السحب والإفلات (Drag & Drop)
- ✅ حفظ البيانات في localStorage
- ✅ تصميم Glassmorphism 
- ✅ Responsive Design
- ✅ Dark Mode

## 🔧 Custom Hooks

### useKanbanData
يدير جميع عمليات البيانات:
```javascript
const {
  data,           // البيانات الكاملة
  activeBoard,    // Board الحالي
  switchBoard,    // تبديل Board
  createBoard,    // إنشاء Board
  addColumn,      // إضافة عمود
  deleteColumn,   // حذف عمود
  addTask,        // إضافة مهمة
  updateTask,     // تحديث مهمة
  deleteTask,     // حذف مهمة
} = useKanbanData();
```

### useDragAndDrop
يدير منطق السحب والإفلات:
```javascript
const { onDragEnd } = useDragAndDrop(data, setData, activeBoard);
```

### useModals
يدير حالات المودالات:
```javascript
const {
  isTaskModalOpen,
  openAddTaskModal,
  closeTaskModal,
  // ... المزيد
} = useModals();
```

## 📝 ملاحظات مهمة

1. **الكود نظيف ومنظم**: `App.jsx` الآن أقل من 200 سطر بدلاً من 569!
2. **سهولة الصيانة**: كل جزء في ملف منفصل
3. **قابلية إعادة الاستخدام**: المكونات والـ Hooks قابلة للاستخدام في مشاريع أخرى
4. **Best Practices**: اتباع أفضل الممارسات في React

## 🎓 للتعلم

هذا المشروع مثال ممتاز على:
- كيفية تنظيم مشروع React احترافي
- استخدام Custom Hooks بشكل صحيح
- فصل المنطق عن العرض
- Component-Based Architecture
- Modern Tailwind CSS setup

---

Made with ❤️ by Anas
