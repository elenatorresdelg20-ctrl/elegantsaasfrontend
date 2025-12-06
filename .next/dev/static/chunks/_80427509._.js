(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/parrot-mascot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParrotMascot",
    ()=>ParrotMascot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ParrotMascot({ size = "md", mood = "idle", className, onClick, showName = false, interactive = true }) {
    _s();
    const [blinking, setBlinking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentMood, setCurrentMood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mood);
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Sync mood with prop changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ParrotMascot.useEffect": ()=>{
            setCurrentMood(mood);
        }
    }["ParrotMascot.useEffect"], [
        mood
    ]);
    // Blink animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ParrotMascot.useEffect": ()=>{
            if (currentMood === "sleeping") return;
            const blinkInterval = setInterval({
                "ParrotMascot.useEffect.blinkInterval": ()=>{
                    setBlinking(true);
                    setTimeout({
                        "ParrotMascot.useEffect.blinkInterval": ()=>setBlinking(false)
                    }["ParrotMascot.useEffect.blinkInterval"], 150);
                }
            }["ParrotMascot.useEffect.blinkInterval"], 2500 + Math.random() * 2000);
            return ({
                "ParrotMascot.useEffect": ()=>clearInterval(blinkInterval)
            })["ParrotMascot.useEffect"];
        }
    }["ParrotMascot.useEffect"], [
        currentMood
    ]);
    // Interactive hover effect
    const handleMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ParrotMascot.useCallback[handleMouseEnter]": ()=>{
            if (!interactive) return;
            setIsHovered(true);
            if (currentMood === "idle") {
                setCurrentMood("happy");
            }
        }
    }["ParrotMascot.useCallback[handleMouseEnter]"], [
        interactive,
        currentMood
    ]);
    const handleMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ParrotMascot.useCallback[handleMouseLeave]": ()=>{
            if (!interactive) return;
            setIsHovered(false);
            if (mood === "idle") {
                setCurrentMood("idle");
            }
        }
    }["ParrotMascot.useCallback[handleMouseLeave]"], [
        interactive,
        mood
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ParrotMascot.useCallback[handleClick]": ()=>{
            if (!interactive) {
                onClick?.();
                return;
            }
            setCurrentMood("excited");
            setTimeout({
                "ParrotMascot.useCallback[handleClick]": ()=>setCurrentMood(mood)
            }["ParrotMascot.useCallback[handleClick]"], 1000);
            onClick?.();
        }
    }["ParrotMascot.useCallback[handleClick]"], [
        interactive,
        mood,
        onClick
    ]);
    const sizeClasses = {
        xs: "w-6 h-6",
        sm: "w-10 h-10",
        md: "w-16 h-16",
        lg: "w-24 h-24",
        xl: "w-32 h-32",
        "2xl": "w-48 h-48"
    };
    const eyeSize = {
        xs: {
            outer: 3,
            inner: 1.5,
            highlight: 0.5
        },
        sm: {
            outer: 4,
            inner: 2,
            highlight: 0.8
        },
        md: {
            outer: 5,
            inner: 3,
            highlight: 1
        },
        lg: {
            outer: 6,
            inner: 3.5,
            highlight: 1.2
        },
        xl: {
            outer: 7,
            inner: 4,
            highlight: 1.5
        },
        "2xl": {
            outer: 8,
            inner: 5,
            highlight: 2
        }
    };
    const eyes = eyeSize[size];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center gap-1", className) || ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleClick,
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
                className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative cursor-pointer select-none transition-all duration-300", sizeClasses[size], interactive && "hover:scale-110", isHovered && "drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]") || ""),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    viewBox: "0 0 100 100",
                    className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-full w-full transition-transform", currentMood !== "thinking" && currentMood !== "sleeping" && "animate-[bounce-gentle_3s_ease-in-out_infinite]") || ""),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            className: "jsx-a805b799bccb9ce3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "bodyGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "#60A5FA",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "50%",
                                            stopColor: "#3B82F6",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "#2563EB",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "bellyGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "0%",
                                    y2: "100%",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "#F8FBFE",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 124,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "#E0F2FE",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "hatGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "0%",
                                    y2: "100%",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "#3B82F6",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "#1E40AF",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "wingGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "100%",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "#2563EB",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "#1E40AF",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "chartGradient",
                                    x1: "0%",
                                    y1: "100%",
                                    x2: "0%",
                                    y2: "0%",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "#22C55E",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 136,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "#4ADE80",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "glow",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                            stdDeviation: "2",
                                            result: "coloredBlur",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 141,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                            className: "jsx-a805b799bccb9ce3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "coloredBlur",
                                                    className: "jsx-a805b799bccb9ce3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/parrot-mascot.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                    in: "SourceGraphic",
                                                    className: "jsx-a805b799bccb9ce3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/parrot-mascot.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 142,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                    id: "shadow",
                                    x: "-20%",
                                    y: "-20%",
                                    width: "140%",
                                    height: "140%",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                                        dx: "0",
                                        dy: "2",
                                        stdDeviation: "2",
                                        floodOpacity: "0.2",
                                        className: "jsx-a805b799bccb9ce3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/parrot-mascot.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                            cx: "50",
                            cy: "95",
                            rx: "18",
                            ry: "4",
                            fill: "rgba(0,0,0,0.15)",
                            className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("transition-all duration-300", currentMood === "excited" && "animate-[pulse_0.5s_ease-in-out_infinite]") || "")
                        }, void 0, false, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(currentMood === "excited" && "animate-[waggle_0.3s_ease-in-out_infinite]") || ""),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M38 82 Q30 95 35 102",
                                    stroke: "url(#wingGradient)",
                                    strokeWidth: "5",
                                    strokeLinecap: "round",
                                    fill: "none",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M50 85 Q50 98 50 105",
                                    stroke: "#1E40AF",
                                    strokeWidth: "5",
                                    strokeLinecap: "round",
                                    fill: "none",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M62 82 Q70 95 65 102",
                                    stroke: "url(#wingGradient)",
                                    strokeWidth: "5",
                                    strokeLinecap: "round",
                                    fill: "none",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                            cx: "50",
                            cy: "62",
                            rx: "24",
                            ry: "28",
                            fill: "url(#bodyGradient)",
                            filter: "url(#shadow)",
                            className: "jsx-a805b799bccb9ce3"
                        }, void 0, false, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                            cx: "50",
                            cy: "66",
                            rx: "16",
                            ry: "20",
                            fill: "url(#bellyGradient)",
                            className: "jsx-a805b799bccb9ce3"
                        }, void 0, false, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M42 58 Q50 62 58 58",
                            stroke: "#CBD5E1",
                            strokeWidth: "0.5",
                            fill: "none",
                            opacity: "0.5",
                            className: "jsx-a805b799bccb9ce3"
                        }, void 0, false, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M40 65 Q50 70 60 65",
                            stroke: "#CBD5E1",
                            strokeWidth: "0.5",
                            fill: "none",
                            opacity: "0.5",
                            className: "jsx-a805b799bccb9ce3"
                        }, void 0, false, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M42 72 Q50 77 58 72",
                            stroke: "#CBD5E1",
                            strokeWidth: "0.5",
                            fill: "none",
                            opacity: "0.5",
                            className: "jsx-a805b799bccb9ce3"
                        }, void 0, false, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("origin-[30px_55px] transition-transform", currentMood === "waving" && "animate-[wave_0.6s_ease-in-out_infinite]", currentMood === "excited" && "animate-[flap_0.2s_ease-in-out_infinite]") || ""),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M26 50 Q14 62 18 78 Q26 72 30 60 Q28 54 26 50",
                                    fill: "url(#wingGradient)",
                                    filter: "url(#shadow)",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M28 55 Q20 65 22 72",
                                    stroke: "#60A5FA",
                                    strokeWidth: "1.5",
                                    fill: "none",
                                    opacity: "0.6",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 205,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M26 58 Q20 66 21 70",
                                    stroke: "#93C5FD",
                                    strokeWidth: "1",
                                    fill: "none",
                                    opacity: "0.4",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("origin-[70px_55px] transition-transform", currentMood === "waving" && "animate-[wave-reverse_0.6s_ease-in-out_infinite]", currentMood === "excited" && "animate-[flap-reverse_0.2s_ease-in-out_infinite]") || ""),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M74 50 Q86 62 82 78 Q74 72 70 60 Q72 54 74 50",
                                    fill: "url(#wingGradient)",
                                    filter: "url(#shadow)",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 217,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M72 55 Q80 65 78 72",
                                    stroke: "#60A5FA",
                                    strokeWidth: "1.5",
                                    fill: "none",
                                    opacity: "0.6",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    transform: "translate(76, 58) scale(0.35)",
                                    filter: "url(#glow)",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "15",
                                            cy: "15",
                                            r: "14",
                                            fill: "white",
                                            stroke: "#2563EB",
                                            strokeWidth: "2",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "5",
                                            y: "17",
                                            width: "4",
                                            height: "9",
                                            fill: "#2563EB",
                                            rx: "1",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "11",
                                            y: "11",
                                            width: "4",
                                            height: "15",
                                            fill: "url(#chartGradient)",
                                            rx: "1",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "17",
                                            y: "6",
                                            width: "4",
                                            height: "20",
                                            fill: "#2563EB",
                                            rx: "1",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "7",
                                            cy: "12",
                                            r: "1.5",
                                            fill: "#22C55E",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "13",
                                            cy: "7",
                                            r: "1.5",
                                            fill: "#22C55E",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "19",
                                            cy: "3",
                                            r: "1.5",
                                            fill: "#22C55E",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 228,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M7 12 L13 7 L19 3",
                                            stroke: "#22C55E",
                                            strokeWidth: "1",
                                            fill: "none",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 229,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "50",
                            cy: "32",
                            r: "20",
                            fill: "url(#bodyGradient)",
                            filter: "url(#shadow)",
                            className: "jsx-a805b799bccb9ce3"
                        }, void 0, false, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                            cx: "50",
                            cy: "35",
                            rx: "14",
                            ry: "12",
                            fill: "url(#bellyGradient)",
                            className: "jsx-a805b799bccb9ce3"
                        }, void 0, false, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("origin-[50px_15px]", currentMood === "happy" && "animate-[tilt_0.5s_ease-in-out_infinite]", currentMood === "excited" && "animate-[jump_0.3s_ease-in-out_infinite]") || ""),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                    cx: "50",
                                    cy: "18",
                                    rx: "24",
                                    ry: "7",
                                    fill: "#1E40AF",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M30 18 Q30 2 50 2 Q70 2 70 18",
                                    fill: "url(#hatGradient)",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 250,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "30",
                                    y: "14",
                                    width: "40",
                                    height: "5",
                                    fill: "#1E3A8A",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M38 8 Q42 4 50 4",
                                    stroke: "rgba(255,255,255,0.3)",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    fill: "none",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                    cx: "40",
                                    cy: "30",
                                    rx: eyes.outer,
                                    ry: currentMood === "sleeping" ? 0.5 : eyes.outer,
                                    fill: "white",
                                    className: "jsx-a805b799bccb9ce3" + " " + "transition-all duration-150"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 266,
                                    columnNumber: 13
                                }, this),
                                currentMood !== "sleeping" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: currentMood === "thinking" ? 38 : 41,
                                            cy: "30",
                                            r: blinking ? 0.5 : eyes.inner,
                                            fill: "#1E3A5F",
                                            className: "jsx-a805b799bccb9ce3" + " " + "transition-all duration-100"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 276,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "43",
                                            cy: "28",
                                            r: eyes.highlight,
                                            fill: "white",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 283,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                    cx: "60",
                                    cy: "30",
                                    rx: eyes.outer,
                                    ry: currentMood === "sleeping" ? 0.5 : eyes.outer,
                                    fill: "white",
                                    className: "jsx-a805b799bccb9ce3" + " " + "transition-all duration-150"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this),
                                currentMood !== "sleeping" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: currentMood === "thinking" ? 58 : 61,
                                            cy: "30",
                                            r: blinking ? 0.5 : eyes.inner,
                                            fill: "#1E3A5F",
                                            className: "jsx-a805b799bccb9ce3" + " " + "transition-all duration-100"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 298,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "63",
                                            cy: "28",
                                            r: eyes.highlight,
                                            fill: "white",
                                            className: "jsx-a805b799bccb9ce3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 305,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 264,
                            columnNumber: 11
                        }, this),
                        currentMood === "thinking" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M35 24 Q40 22 45 24",
                                    stroke: "#1E3A5F",
                                    strokeWidth: "1.5",
                                    fill: "none",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 313,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M55 24 Q60 22 65 24",
                                    stroke: "#1E3A5F",
                                    strokeWidth: "1.5",
                                    fill: "none",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 314,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 312,
                            columnNumber: 13
                        }, this),
                        currentMood === "excited" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M35 23 L45 25",
                                    stroke: "#1E3A5F",
                                    strokeWidth: "1.5",
                                    fill: "none",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M55 25 L65 23",
                                    stroke: "#1E3A5F",
                                    strokeWidth: "1.5",
                                    fill: "none",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 320,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("origin-[50px_42px]", currentMood === "talking" && "animate-[talk_0.3s_ease-in-out_infinite]") || ""),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M50 38 Q43 41 45 46 Q50 44 55 46 Q57 41 50 38",
                                    fill: "#F59E0B",
                                    stroke: "#D97706",
                                    strokeWidth: "0.5",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 332,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M46 46 Q50 49 54 46",
                                    fill: "#FCD34D",
                                    stroke: "#D97706",
                                    strokeWidth: "0.5",
                                    className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(currentMood === "talking" && "animate-[beak_0.15s_ease-in-out_infinite]") || "")
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 334,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M48 40 Q50 39 52 40",
                                    stroke: "rgba(255,255,255,0.4)",
                                    strokeWidth: "1",
                                    fill: "none",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 342,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 325,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                            cx: "32",
                            cy: "38",
                            rx: "4",
                            ry: "3",
                            fill: "#FDA4AF",
                            opacity: currentMood === "happy" || currentMood === "excited" ? "0.7" : "0.4",
                            className: "jsx-a805b799bccb9ce3"
                        }, void 0, false, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 346,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                            cx: "68",
                            cy: "38",
                            rx: "4",
                            ry: "3",
                            fill: "#FDA4AF",
                            opacity: currentMood === "happy" || currentMood === "excited" ? "0.7" : "0.4",
                            className: "jsx-a805b799bccb9ce3"
                        }, void 0, false, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 354,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M38 88 L35 94 M38 88 L38 94 M38 88 L41 94",
                                    stroke: "#F59E0B",
                                    strokeWidth: "2.5",
                                    strokeLinecap: "round",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M62 88 L59 94 M62 88 L62 94 M62 88 L65 94",
                                    stroke: "#F59E0B",
                                    strokeWidth: "2.5",
                                    strokeLinecap: "round",
                                    className: "jsx-a805b799bccb9ce3"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 371,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 364,
                            columnNumber: 11
                        }, this),
                        currentMood === "thinking" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "80",
                                    cy: "20",
                                    r: "3",
                                    fill: "#60A5FA",
                                    opacity: "0.5",
                                    className: "jsx-a805b799bccb9ce3" + " " + "animate-[float_1.5s_ease-in-out_infinite]"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 382,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "86",
                                    cy: "12",
                                    r: "4",
                                    fill: "#60A5FA",
                                    opacity: "0.6",
                                    className: "jsx-a805b799bccb9ce3" + " " + "animate-[float_1.5s_ease-in-out_infinite_0.2s]"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 390,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "92",
                                    cy: "4",
                                    r: "5",
                                    fill: "#60A5FA",
                                    opacity: "0.7",
                                    className: "jsx-a805b799bccb9ce3" + " " + "animate-[float_1.5s_ease-in-out_infinite_0.4s]"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 398,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 381,
                            columnNumber: 13
                        }, this),
                        (currentMood === "happy" || currentMood === "excited") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            filter: "url(#glow)",
                            className: "jsx-a805b799bccb9ce3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M15 25 L17 20 L19 25 L24 27 L19 29 L17 34 L15 29 L10 27 Z",
                                    fill: "#22C55E",
                                    className: "jsx-a805b799bccb9ce3" + " " + "animate-[sparkle_1s_ease-in-out_infinite]"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 412,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M80 40 L82 36 L84 40 L88 42 L84 44 L82 48 L80 44 L76 42 Z",
                                    fill: "#22C55E",
                                    className: "jsx-a805b799bccb9ce3" + " " + "animate-[sparkle_1s_ease-in-out_infinite_0.3s]"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 417,
                                    columnNumber: 15
                                }, this),
                                currentMood === "excited" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M25 55 L26 52 L27 55 L30 56 L27 57 L26 60 L25 57 L22 56 Z",
                                            fill: "#3B82F6",
                                            className: "jsx-a805b799bccb9ce3" + " " + "animate-[sparkle_0.8s_ease-in-out_infinite_0.5s]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 424,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M75 20 L76 17 L77 20 L80 21 L77 22 L76 25 L75 22 L72 21 Z",
                                            fill: "#F59E0B",
                                            className: "jsx-a805b799bccb9ce3" + " " + "animate-[sparkle_0.8s_ease-in-out_infinite_0.7s]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/parrot-mascot.tsx",
                                            lineNumber: 429,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 411,
                            columnNumber: 13
                        }, this),
                        currentMood === "sleeping" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "jsx-a805b799bccb9ce3" + " " + "animate-[float_2s_ease-in-out_infinite]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: "70",
                                    y: "20",
                                    fill: "#60A5FA",
                                    fontSize: "10",
                                    fontWeight: "bold",
                                    opacity: "0.7",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: "Z"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 442,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: "78",
                                    y: "12",
                                    fill: "#60A5FA",
                                    fontSize: "8",
                                    fontWeight: "bold",
                                    opacity: "0.5",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: "z"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 445,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: "84",
                                    y: "6",
                                    fill: "#60A5FA",
                                    fontSize: "6",
                                    fontWeight: "bold",
                                    opacity: "0.3",
                                    className: "jsx-a805b799bccb9ce3",
                                    children: "z"
                                }, void 0, false, {
                                    fileName: "[project]/components/parrot-mascot.tsx",
                                    lineNumber: 448,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/parrot-mascot.tsx",
                            lineNumber: 441,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/parrot-mascot.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/parrot-mascot.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            showName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "jsx-a805b799bccb9ce3" + " " + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-bold text-primary transition-all", size === "xs" && "text-[8px]", size === "sm" && "text-xs", size === "md" && "text-sm", size === "lg" && "text-base", size === "xl" && "text-lg", size === "2xl" && "text-xl") || ""),
                children: "Parrot"
            }, void 0, false, {
                fileName: "[project]/components/parrot-mascot.tsx",
                lineNumber: 457,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "a805b799bccb9ce3",
                children: "@keyframes bounce-gentle{0%,to{transform:translateY(0)}50%{transform:translateY(-3px)}}@keyframes wave{0%,to{transform:rotate(0)}50%{transform:rotate(-25deg)}}@keyframes wave-reverse{0%,to{transform:rotate(0)}50%{transform:rotate(25deg)}}@keyframes flap{0%,to{transform:rotate(0)}50%{transform:rotate(-15deg)}}@keyframes flap-reverse{0%,to{transform:rotate(0)}50%{transform:rotate(15deg)}}@keyframes talk{0%,to{transform:scaleY(1)}50%{transform:scaleY(.85)}}@keyframes beak{0%,to{transform:translateY(0)}50%{transform:translateY(2px)}}@keyframes tilt{0%,to{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}@keyframes jump{0%,to{transform:translateY(0)rotate(0)}50%{transform:translateY(-3px)rotate(5deg)}}@keyframes waggle{0%,to{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}@keyframes sparkle{0%,to{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}@keyframes float{0%,to{opacity:.7;transform:translateY(0)}50%{opacity:1;transform:translateY(-5px)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/parrot-mascot.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_s(ParrotMascot, "G6CVnapLpuRjbipyeXzQhu6YtJI=");
_c = ParrotMascot;
var _c;
__turbopack_context__.k.register(_c, "ParrotMascot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/floating-parrot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingParrot",
    ()=>FloatingParrot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$parrot$2d$mascot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/parrot-mascot.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const tips = [
    "¿Sabías que puedo analizar correlaciones entre tus métricas?",
    "Pregúntame sobre tendencias en tus datos de ventas",
    "Puedo ayudarte a crear reportes automáticos",
    "Analizo tu NPS y CSAT para encontrar áreas de mejora",
    "¿Necesitas predecir el churn de clientes? ¡Yo te ayudo!"
];
function FloatingParrot() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentTip, setCurrentTip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showTip, setShowTip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasInteracted, setHasInteracted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Don't show on login or ai-assistant pages
    const hiddenPages = [
        "/login",
        "/ai-assistant"
    ];
    const shouldHide = hiddenPages.some((page)=>pathname.startsWith(page));
    // Cycle through tips
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FloatingParrot.useEffect": ()=>{
            if (shouldHide || hasInteracted) return;
            const showTipTimeout = setTimeout({
                "FloatingParrot.useEffect.showTipTimeout": ()=>{
                    setShowTip(true);
                }
            }["FloatingParrot.useEffect.showTipTimeout"], 5000);
            const tipInterval = setInterval({
                "FloatingParrot.useEffect.tipInterval": ()=>{
                    setCurrentTip({
                        "FloatingParrot.useEffect.tipInterval": (prev)=>(prev + 1) % tips.length
                    }["FloatingParrot.useEffect.tipInterval"]);
                }
            }["FloatingParrot.useEffect.tipInterval"], 8000);
            return ({
                "FloatingParrot.useEffect": ()=>{
                    clearTimeout(showTipTimeout);
                    clearInterval(tipInterval);
                }
            })["FloatingParrot.useEffect"];
        }
    }["FloatingParrot.useEffect"], [
        shouldHide,
        hasInteracted
    ]);
    if (shouldHide) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3",
        children: [
            showTip && !isOpen && !hasInteracted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[280px] rounded-2xl border border-border bg-card p-4 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setShowTip(false);
                            setHasInteracted(true);
                        },
                        className: "absolute -right-2 -top-2 rounded-full bg-secondary p-1 text-muted-foreground hover:text-foreground",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-3 w-3"
                        }, void 0, false, {
                            fileName: "[project]/components/floating-parrot.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/floating-parrot.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-foreground",
                        children: tips[currentTip]
                    }, void 0, false, {
                        fileName: "[project]/components/floating-parrot.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/ai-assistant",
                        className: "mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline",
                        children: [
                            "Hablar con Parrot",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/components/floating-parrot.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/floating-parrot.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/floating-parrot.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-in fade-in slide-in-from-bottom-4 duration-300 w-80 rounded-2xl border border-border bg-card shadow-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-border bg-gradient-to-r from-blue-500/10 to-green-500/10 px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$parrot$2d$mascot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParrotMascot"], {
                                        size: "xs",
                                        mood: "happy",
                                        interactive: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/floating-parrot.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-sm text-foreground",
                                        children: "Parrot Assistant"
                                    }, void 0, false, {
                                        fileName: "[project]/components/floating-parrot.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/floating-parrot.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsOpen(false),
                                className: "text-muted-foreground hover:text-foreground",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/floating-parrot.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/floating-parrot.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/floating-parrot.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$parrot$2d$mascot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParrotMascot"], {
                                        size: "sm",
                                        mood: "idle",
                                        interactive: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/floating-parrot.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl bg-secondary px-4 py-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-foreground",
                                            children: "¡Hola! Soy Parrot, tu asistente de análisis. ¿En qué puedo ayudarte hoy?"
                                        }, void 0, false, {
                                            fileName: "[project]/components/floating-parrot.tsx",
                                            lineNumber: 90,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/floating-parrot.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/floating-parrot.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/ai-assistant",
                                className: "block w-full rounded-xl bg-primary py-3 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors",
                                children: "Abrir chat completo"
                            }, void 0, false, {
                                fileName: "[project]/components/floating-parrot.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/floating-parrot.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/floating-parrot.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    setIsOpen(!isOpen);
                    setShowTip(false);
                    setHasInteracted(true);
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative rounded-full p-1 shadow-lg transition-all duration-300 hover:scale-110", "bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-border", "hover:shadow-xl hover:shadow-primary/20", isOpen && "rotate-0"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$parrot$2d$mascot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParrotMascot"], {
                        size: "md",
                        mood: isOpen ? "happy" : "idle",
                        interactive: false
                    }, void 0, false, {
                        fileName: "[project]/components/floating-parrot.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    !hasInteracted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute -right-1 -top-1 flex h-4 w-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
                            }, void 0, false, {
                                fileName: "[project]/components/floating-parrot.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative inline-flex h-4 w-4 rounded-full bg-primary"
                            }, void 0, false, {
                                fileName: "[project]/components/floating-parrot.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/floating-parrot.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/floating-parrot.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/floating-parrot.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(FloatingParrot, "5v9rvvVMM/3erUCQpwrAJUYna3o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = FloatingParrot;
var _c;
__turbopack_context__.k.register(_c, "FloatingParrot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_80427509._.js.map