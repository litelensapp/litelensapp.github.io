import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { AppleIcon, Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DownloadIcon, GithubIcon, LinuxIcon, Tabs, TabsContent, TabsList, TabsTrigger, WindowsIcon } from "@litelens/design-system/atoms";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cn } from "@litelens/design-system/utils";
import { useEffect, useState } from "react";
import { useBreakpoint, useCopyToClipboard } from "@litelens/design-system/hooks";
import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
//#region src/components/AuthorModal.tsx
var AUTHOR_URL = "https://gknguyen.info";
var AuthorModal = () => {
	return /* @__PURE__ */ jsxs(Dialog, { children: [/* @__PURE__ */ jsx(DialogTrigger, { children: /* @__PURE__ */ jsx("span", {
		className: "cursor-pointer text-white italic hover:text-white/80",
		children: "@gknguyen"
	}) }), /* @__PURE__ */ jsxs(DialogContent, {
		size: "md",
		showCloseButton: true,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Hey there! 👋" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Buy me a coffee if you love this project ❤️" })] }), /* @__PURE__ */ jsxs("div", {
			className: "text-body flex flex-col gap-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:gap-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ jsx("img", {
						src: `${AUTHOR_URL}/assets/payments/momo.jpg`,
						alt: "MOMO payment QR code",
						className: "h-40 w-40 sm:h-50 sm:w-50"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-caption pointer-events-none touch-none font-medium select-none",
						children: "MOMO (VN Region)"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ jsx("img", {
						src: `${AUTHOR_URL}/assets/payments/paypal.jpeg`,
						alt: "PayPal payment QR code",
						className: "h-40 w-40 sm:h-50 sm:w-50"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-caption pointer-events-none touch-none font-medium select-none",
						children: "PayPal"
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "text-center",
				children: [
					"Get to know more about me at",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: AUTHOR_URL,
						target: "_blank",
						rel: "noreferrer",
						className: "text-info underline hover:text-info/80",
						children: "gknguyen.info"
					})
				]
			})]
		})]
	})] });
};
//#endregion
//#region src/components/Footer.tsx
var Footer = () => {
	return /* @__PURE__ */ jsxs("footer", {
		className: "flex h-12 flex-col items-center justify-between bg-success px-6 md:h-8 md:flex-row",
		children: [/* @__PURE__ */ jsx(AuthorModal, {}), /* @__PURE__ */ jsx("span", {
			className: "text-white",
			children: "© 2026 Litelens. All rights reserved."
		})]
	});
};
//#endregion
//#region src/assets/logo-transparent.png
var logo_transparent_default = "/assets/logo-transparent-Bh9_wwGG.png";
//#endregion
//#region src/hooks/data-access/useGetGithubLatestRelease.ts
var useGetGithubLatestRelease = () => {
	const url = `https://api.github.com/repos/litelensapp/litelens/releases/latest`;
	return useQuery({
		queryKey: ["fetch", url],
		queryFn: async () => {
			const res = await fetch(url);
			if (!res.ok) throw new Error(`Request to ${url} failed with status ${res.status}`);
			return res.json();
		}
	});
};
//#endregion
//#region src/components/badges/GithubReleaseBadge.tsx
var GithubReleaseBadge = () => {
	const { data, isPending } = useGetGithubLatestRelease();
	const version = data?.tag_name;
	return /* @__PURE__ */ jsxs(Button, {
		size: "sm",
		className: "h-8 gap-0 overflow-hidden rounded-lg p-0 hover:brightness-95",
		render: /* @__PURE__ */ jsx("a", {
			href: "https://github.com/litelensapp/litelens",
			target: "_blank",
			rel: "noopener noreferrer"
		}),
		children: [/* @__PURE__ */ jsxs("span", {
			className: "flex h-full items-center gap-1.5 bg-foreground px-3 text-background",
			children: [/* @__PURE__ */ jsx(GithubIcon, { className: "size-4" }), "GITHUB"]
		}), isPending ? /* @__PURE__ */ jsx("span", {
			className: "flex h-full items-center bg-success/85 px-3",
			children: /* @__PURE__ */ jsx("span", { className: "h-3 w-10 animate-pulse rounded-full bg-white/50" })
		}) : version && /* @__PURE__ */ jsx("span", {
			className: "flex h-full items-center bg-success/85 px-3 font-mono text-white",
			children: version
		})]
	});
};
//#endregion
//#region src/components/Header.tsx
var Header = () => {
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return /* @__PURE__ */ jsxs("header", {
		className: cn("sticky top-0 z-50 flex h-16 items-center border-b border-border bg-background px-6 transition-shadow duration-200", scrolled && "shadow-sm"),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ jsx("img", {
				src: logo_transparent_default,
				alt: "Litelens",
				className: "h-8 w-auto"
			}), /* @__PURE__ */ jsx("span", {
				className: "text-h1 font-heading text-foreground",
				children: "Litelens"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "ml-auto flex items-center",
			children: /* @__PURE__ */ jsx(GithubReleaseBadge, {})
		})]
	});
};
//#endregion
//#region src/assets/hero-demo-poster.jpg
var hero_demo_poster_default = "/assets/hero-demo-poster-CqoKjYAT.jpg";
//#endregion
//#region src/assets/hero-demo.webm
var hero_demo_default$1 = "/assets/hero-demo-CeHDyPlh.webm";
//#endregion
//#region src/assets/hero-demo.mp4
var hero_demo_default = "/assets/hero-demo-D84zvc-X.mp4";
//#endregion
//#region src/hooks/data-access/useGetGithubLicense.ts
var useGetGithubLicense = () => {
	const url = "https://api.github.com/repos/litelensapp/litelens";
	return useQuery({
		queryKey: ["fetch", url],
		queryFn: async () => {
			const res = await fetch(url);
			if (!res.ok) throw new Error(`Request to ${url} failed with status ${res.status}`);
			return res.json();
		}
	});
};
//#endregion
//#region src/components/badges/GithubLicenseBadge.tsx
var GithubLicenseBadge = () => {
	const { data, isPending } = useGetGithubLicense();
	const spdxId = data?.license?.spdx_id;
	return /* @__PURE__ */ jsxs(Button, {
		size: "sm",
		className: "h-8 gap-0 overflow-hidden rounded-lg p-0 hover:brightness-95",
		render: /* @__PURE__ */ jsx("a", {
			href: `https://github.com/litelensapp/litelens/blob/master/LICENSE`,
			target: "_blank",
			rel: "noopener noreferrer"
		}),
		children: [/* @__PURE__ */ jsx("span", {
			className: "flex h-full items-center bg-foreground px-3 text-background",
			children: "LICENSE"
		}), isPending ? /* @__PURE__ */ jsx("span", {
			className: "flex h-full items-center bg-success/85 px-3",
			children: /* @__PURE__ */ jsx("span", { className: "h-3 w-14 animate-pulse rounded-full bg-white/50" })
		}) : spdxId && /* @__PURE__ */ jsx("span", {
			className: "flex h-full items-center bg-success/85 px-3 font-mono text-white",
			children: spdxId
		})]
	});
};
//#endregion
//#region src/components/Section.tsx
var Section = ({ children, paddingBotton, id }) => {
	return /* @__PURE__ */ jsx("section", {
		id,
		className: cn("bg-background px-6 py-4 md:pt-16", paddingBotton && "md:pb-16"),
		children
	});
};
//#endregion
//#region src/components/Hero.tsx
var Hero = () => {
	return /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-1 items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12",
		children: [/* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-hero mb-4 font-heading text-success",
				children: "A native desktop dashboard for Kubernetes."
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-lead mb-6 max-w-lg text-muted-foreground",
				children: "Litelens is a lightweight, native desktop app for managing Kubernetes clusters — a clean, modern, watch-based UI over your cluster, without the overhead of Electron."
			}),
			/* @__PURE__ */ jsx(GithubLicenseBadge, {})
		] }), /* @__PURE__ */ jsx("div", {
			className: "overflow-hidden rounded-xl border border-border bg-muted shadow-md",
			children: /* @__PURE__ */ jsxs("video", {
				poster: hero_demo_poster_default,
				preload: "metadata",
				autoPlay: true,
				muted: true,
				loop: true,
				playsInline: true,
				className: "h-auto w-full object-cover",
				children: [/* @__PURE__ */ jsx("source", {
					src: hero_demo_default$1,
					type: "video/webm"
				}), /* @__PURE__ */ jsx("source", {
					src: hero_demo_default,
					type: "video/mp4"
				})]
			})
		})]
	}) });
};
//#endregion
//#region src/components/CodeBlock.tsx
var CodeBlock = ({ code }) => {
	const { copiedValue, copy } = useCopyToClipboard();
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start gap-2 rounded-lg border border-border bg-muted p-4",
		children: [/* @__PURE__ */ jsx("pre", {
			className: "min-w-0 flex-1 overflow-x-auto font-mono text-sm text-foreground",
			children: /* @__PURE__ */ jsx("code", { children: code })
		}), /* @__PURE__ */ jsx(Button, {
			variant: "ghost",
			onClick: () => copy(code),
			className: "h-auto shrink-0 gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-background hover:text-foreground",
			title: "Copy to clipboard",
			children: copiedValue !== null ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", { children: "Copied" })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CopyIcon, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", { children: "Copy" })] })
		})]
	});
};
//#endregion
//#region src/components/download/DownloadButton.tsx
var DownloadButton = ({ asset, label }) => {
	return /* @__PURE__ */ jsxs(Button, {
		variant: "success",
		size: "lg",
		nativeButton: false,
		render: /* @__PURE__ */ jsx("a", { href: `https://github.com/litelensapp/litelens/releases/latest/download/${asset}` }),
		children: [/* @__PURE__ */ jsx(DownloadIcon, {}), label]
	});
};
//#endregion
//#region src/components/download/LinuxContent.tsx
var LinuxContent = () => {
	return /* @__PURE__ */ jsx(TabsContent, {
		value: "linux",
		className: "space-y-4",
		children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
			className: "text-h2 mb-4",
			children: "Ubuntu 24.04 (noble)"
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
				className: "text-h3 mb-4",
				children: "apt"
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ jsx(CodeBlock, { code: `curl -fsSL https://litelensapp.github.io/litelens-apt/keys/litelens-keyring.gpg | sudo gpg --dearmor -o /usr/share/keyrings/litelens-archive-keyring.gpg\necho "deb [signed-by=/usr/share/keyrings/litelens-archive-keyring.gpg] https://litelensapp.github.io/litelens-apt noble main" | sudo tee /etc/apt/sources.list.d/litelens.list\nsudo apt-get update && sudo apt-get install litelens` }), /* @__PURE__ */ jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Other Ubuntu releases (jammy/22.04, focal/20.04) just swap the codename (",
						/* @__PURE__ */ jsx("code", {
							className: "font-mono",
							children: "noble"
						}),
						") in the second line."
					]
				})]
			})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
				className: "text-h3 mb-4",
				children: "Manual"
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Run the install script."
					}),
					/* @__PURE__ */ jsx(CodeBlock, { code: `curl -fsSL "https://raw.githubusercontent.com/litelensapp/litelens/main/scripts/install.sh" | bash` }),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Or click the button below to download the binary directly."
					}),
					/* @__PURE__ */ jsx(DownloadButton, {
						asset: "litelens-linux-amd64.tar.gz",
						label: "Download for Linux (amd64)"
					})
				]
			})] })]
		})] })
	});
};
//#endregion
//#region src/components/download/MacosContent.tsx
var MacosContent = () => {
	return /* @__PURE__ */ jsxs(TabsContent, {
		value: "macos",
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
			className: "text-h2 mb-4",
			children: "Homebrew"
		}), /* @__PURE__ */ jsx(CodeBlock, { code: `brew tap litelensapp/homebrew-litelens\nbrew trust litelensapp/litelens/litelens\nbrew install litelens` })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
			className: "text-h2 mb-4",
			children: "Manual"
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Run the install script."
				}),
				/* @__PURE__ */ jsx(CodeBlock, { code: `curl -fsSL "https://raw.githubusercontent.com/litelensapp/litelens/main/scripts/install.sh" | bash` }),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Or click the button below to download the binary directly."
				}),
				/* @__PURE__ */ jsx(DownloadButton, {
					asset: "litelens-darwin-arm64.zip",
					label: "Download for macOS (Apple Silicon)"
				})
			]
		})] })]
	});
};
//#endregion
//#region src/components/download/WindowsContent.tsx
var WindowsContent = () => {
	return /* @__PURE__ */ jsx(TabsContent, {
		value: "windows",
		className: "space-y-4",
		children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
			className: "text-h2 mb-4",
			children: "Manual"
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border bg-muted p-4",
					children: [/* @__PURE__ */ jsx("p", {
						className: "mb-4 text-sm text-muted-foreground",
						children: "Windows support and prebuilt installers aren't published yet. Check the releases page for updates."
					}), /* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap items-center gap-3",
						children: /* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							size: "lg",
							nativeButton: false,
							render: /* @__PURE__ */ jsx("a", {
								href: "https://github.com/litelensapp/litelens/releases",
								target: "_blank",
								rel: "noopener noreferrer"
							}),
							children: ["View on GitHub", /* @__PURE__ */ jsx(ExternalLinkIcon, { className: "h-4 w-4" })]
						})
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Or click the button below to download the binary directly."
				}),
				/* @__PURE__ */ jsx(DownloadButton, {
					asset: "litelens-windows-amd64.exe",
					label: "Download for Windows (amd64)"
				})
			]
		})] })
	});
};
//#endregion
//#region src/components/download/Download.tsx
var PLATFORMS = {
	macos: "macos",
	linux: "linux",
	windows: "windows"
};
var PLATFORM_TABS = [
	{
		value: "macos",
		label: "MacOS",
		icon: AppleIcon
	},
	{
		value: "linux",
		label: "Linux",
		icon: LinuxIcon
	},
	{
		value: "windows",
		label: "Windows",
		icon: WindowsIcon
	}
];
var Download = () => {
	const isDesktop = useBreakpoint("md");
	return /* @__PURE__ */ jsxs(Section, {
		paddingBotton: true,
		id: "installation",
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "text-hero mb-2 font-heading text-foreground",
				children: "Installation"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-lead mb-8 text-muted-foreground",
				children: "Choose your platform"
			}),
			/* @__PURE__ */ jsx(Tabs, {
				defaultValue: PLATFORMS.macos,
				orientation: isDesktop ? "vertical" : "horizontal",
				className: "w-full data-vertical:grid-cols-1",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]",
					children: [/* @__PURE__ */ jsx(TabsList, {
						variant: "line",
						className: "w-full justify-start gap-2 pr-0.5 md:justify-center",
						indicatorClassName: "hidden",
						children: PLATFORM_TABS.map((platform) => /* @__PURE__ */ jsxs(TabsTrigger, {
							value: platform.value,
							className: cn("h-12 flex-none items-center gap-2 rounded-lg text-sm font-semibold not-data-active:hover:bg-muted", "data-active:bg-success data-active:text-white data-active:hover:bg-success/90 data-active:hover:text-white", "min-w-24 rounded-t-lg rounded-b-none", "md:min-w-32 md:rounded-l-lg md:rounded-r-none md:pl-4"),
							children: [/* @__PURE__ */ jsx(platform.icon, { className: "size-4 shrink-0" }), platform.label]
						}, platform.value))
					}), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ jsx(MacosContent, {}),
							/* @__PURE__ */ jsx(LinuxContent, {}),
							/* @__PURE__ */ jsx(WindowsContent, {})
						]
					})]
				})
			})
		]
	});
};
//#endregion
//#region src/App.tsx
var App = () => {
	return /* @__PURE__ */ jsxs("div", {
		className: "h-dvh overflow-x-hidden",
		children: [
			/* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsxs("main", {
				className: "mx-auto max-w-7xl",
				children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(Download, {})]
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
};
//#endregion
//#region src/server/index.tsx
var queryClient = new QueryClient({ defaultOptions: { queries: {
	staleTime: 0,
	gcTime: 0
} } });
var AppWrapper = () => /* @__PURE__ */ jsx(QueryClientProvider, {
	client: queryClient,
	children: /* @__PURE__ */ jsx(App, {})
});
//#endregion
export { AppWrapper as default };
