import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  ChevronRight,
  Save,
  Check,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminTheme } from "@/context/AdminThemeContext";
import { PageHeader } from "@/common/PageHeader/PageHeader";


// ─── Types ─────────────────────────────────────────────────────────────────────
type SettingsTab = "profile" | "notifications" | "security" | "appearance" | "platform";

// ─── Sidebar navigation ────────────────────────────────────────────────────────
const TABS: { id: SettingsTab; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    id: "profile",
    label: "Profile",
    icon: <User size={16} />,
    desc: "Name, email, avatar",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell size={16} />,
    desc: "Alerts & digest preferences",
  },
  {
    id: "security",
    label: "Security",
    icon: <Shield size={16} />,
    desc: "Password & 2FA",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: <Palette size={16} />,
    desc: "Theme & density",
  },
  {
    id: "platform",
    label: "Platform",
    icon: <Globe size={16} />,
    desc: "Locale, timezone & limits",
  },
];

// ─── Toggle component ──────────────────────────────────────────────────────────
const Toggle = ({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) => (
  <button
    type="button"
    id={id}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 ${
      checked ? "bg-brand-600" : "bg-slate-200"
    }`}
    aria-checked={checked}
    role="switch"
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? "translate-x-4" : "translate-x-0"
      }`}
    />
  </button>
);

// ─── Section Title ─────────────────────────────────────────────────────────────
const SectionTitle = ({ title, desc }: { title: string; desc: string }) => (
  <div className="mb-5">
    <h3 className="text-base font-semibold text-slate-800">{title}</h3>
    <p className="text-sm text-slate-500 font-normal mt-0.5">{desc}</p>
  </div>
);

// ─── Input Row ─────────────────────────────────────────────────────────────────
const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  id,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  id: string;
  placeholder?: string;
}) => (
  <div>
    <label htmlFor={id} className="block text-xs font-semibold text-slate-600 mb-1.5">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all font-normal text-slate-700 placeholder:text-slate-400"
    />
  </div>
);

// ─── Toggle Row ────────────────────────────────────────────────────────────────
const ToggleRow = ({
  label,
  desc,
  checked,
  onChange,
  id,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) => (
  <div className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
    <div>
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <p className="text-xs text-slate-500 font-normal mt-0.5">{desc}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} id={id} />
  </div>
);

// ─── Profile Tab ───────────────────────────────────────────────────────────────
function ProfileTab({ onSave }: { onSave: () => void }) {
  const [name, setName] = useState("Super Admin");
  const [email, setEmail] = useState("admin@projecthub.io");
  const [phone, setPhone] = useState("+1 (555) 000-0000");
  const [bio, setBio] = useState("Platform administrator responsible for system oversight.");

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Admin Profile"
        desc="Update your personal details and public-facing information."
      />
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-sm flex-shrink-0">
          SA
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">Profile Picture</p>
          <p className="text-xs text-slate-500 font-normal mb-2">
            PNG or JPG, max 2MB.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs font-semibold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            Upload new photo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          id="settings-name"
          label="Full Name"
          value={name}
          onChange={setName}
          placeholder="Enter your name"
        />
        <InputField
          id="settings-email"
          label="Email Address"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="you@example.com"
        />
        <InputField
          id="settings-phone"
          label="Phone Number"
          value={phone}
          onChange={setPhone}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div>
        <label htmlFor="settings-bio" className="block text-xs font-semibold text-slate-600 mb-1.5">
          Bio
        </label>
        <textarea
          id="settings-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all font-normal text-slate-700 placeholder:text-slate-400 resize-none"
          placeholder="Short bio…"
        />
      </div>

      <Button
        onClick={onSave}
        className="h-10 px-6 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg gap-2"
      >
        <Save size={14} />
        Save Changes
      </Button>
    </div>
  );
}

// ─── Notifications Tab ─────────────────────────────────────────────────────────
function NotificationsTab() {
  const [emailIncidents, setEmailIncidents] = useState(true);
  const [emailProjects, setEmailProjects] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [pushLogins, setPushLogins] = useState(false);
  const [smsIncidents, setSmsIncidents] = useState(true);

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Notification Preferences"
        desc="Choose how and when you receive system alerts."
      />

      {/* Email */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Mail size={14} className="text-slate-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Email
          </p>
        </div>
        <div className="bg-slate-50/60 border border-slate-100 rounded-xl px-5 py-1">
          <ToggleRow
            id="notif-email-incidents"
            label="Critical Incidents"
            desc="Immediate email for critical-severity incidents."
            checked={emailIncidents}
            onChange={setEmailIncidents}
          />
          <ToggleRow
            id="notif-email-projects"
            label="Project Status Changes"
            desc="Notifications when projects are blocked, completed, or canceled."
            checked={emailProjects}
            onChange={setEmailProjects}
          />
          <ToggleRow
            id="notif-email-digest"
            label="Daily Digest"
            desc="Morning summary of the previous day's activity."
            checked={emailDigest}
            onChange={setEmailDigest}
          />
        </div>
      </div>

      {/* Push */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Bell size={14} className="text-slate-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Push
          </p>
        </div>
        <div className="bg-slate-50/60 border border-slate-100 rounded-xl px-5 py-1">
          <ToggleRow
            id="notif-push-alerts"
            label="System Alerts"
            desc="Real-time push for backup failures, quota exceeded, etc."
            checked={pushAlerts}
            onChange={setPushAlerts}
          />
          <ToggleRow
            id="notif-push-logins"
            label="New Admin Logins"
            desc="Push when a new admin session is opened."
            checked={pushLogins}
            onChange={setPushLogins}
          />
        </div>
      </div>

      {/* SMS */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Smartphone size={14} className="text-slate-500" />
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            SMS
          </p>
        </div>
        <div className="bg-slate-50/60 border border-slate-100 rounded-xl px-5 py-1">
          <ToggleRow
            id="notif-sms-incidents"
            label="Critical Incidents Only"
            desc="SMS reserved for critical P0 issues requiring immediate action."
            checked={smsIncidents}
            onChange={setSmsIncidents}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Security Tab ──────────────────────────────────────────────────────────────
function SecurityTab({ onSave }: { onSave: () => void }) {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [twoFa, setTwoFa] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Security Settings"
        desc="Manage your password, two-factor authentication, and session controls."
      />

      {/* Password */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
          Change Password
        </p>
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="settings-current-pwd" className="block text-xs font-semibold text-slate-600 mb-1.5">
              Current Password
            </label>
            <input
              id="settings-current-pwd"
              type={showPwd ? "text" : "password"}
              value={currentPwd}
              onChange={(e) => setCurrentPwd(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 pr-10 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 bottom-2.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              id="settings-new-pwd"
              label="New Password"
              value={newPwd}
              onChange={setNewPwd}
              type="password"
              placeholder="Min. 8 characters"
            />
            <InputField
              id="settings-confirm-pwd"
              label="Confirm New Password"
              value={confirmPwd}
              onChange={setConfirmPwd}
              type="password"
              placeholder="Repeat password"
            />
          </div>
          <Button
            onClick={onSave}
            className="h-10 px-6 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg gap-2"
          >
            <Lock size={14} />
            Update Password
          </Button>
        </div>
      </div>

      {/* 2FA */}
      <div className="bg-slate-50/60 border border-slate-100 rounded-xl px-5 py-1">
        <ToggleRow
          id="settings-2fa"
          label="Two-Factor Authentication (2FA)"
          desc="Add an extra layer of security with TOTP-based verification."
          checked={twoFa}
          onChange={setTwoFa}
        />
      </div>

      {/* Session */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
          Session Timeout
        </p>
        <div className="flex items-center gap-4">
          <select
            id="settings-session-timeout"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all font-semibold text-slate-700"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
          <p className="text-sm text-slate-500 font-normal">
            Auto-logout after this period of inactivity.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Appearance Tab ────────────────────────────────────────────────────────────
function AppearanceTab() {
  const { isDark, setDark } = useAdminTheme();
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [accentColor, setAccentColor] = useState("brand");

  // Derive a 3-way value from isDark
  const theme = isDark ? "dark" : "light";

  const handleTheme = (id: "light" | "dark" | "system") => {
    if (id === "dark") setDark(true);
    else if (id === "light") setDark(false);
    // "system" could be extended later
    else setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  };

  const themes: { id: "light" | "dark" | "system"; label: string; icon: React.ReactNode }[] = [
    { id: "light",  label: "Light",  icon: <Sun size={16} /> },
    { id: "dark",   label: "Dark",   icon: <Moon size={16} /> },
    { id: "system", label: "System", icon: <Monitor size={16} /> },
  ];

  const accents = [
    { id: "brand",   hex: "#3b82f6", label: "Blue" },
    { id: "violet",  hex: "#8b5cf6", label: "Violet" },
    { id: "emerald", hex: "#10b981", label: "Green" },
    { id: "rose",    hex: "#f43f5e", label: "Rose" },
    { id: "amber",   hex: "#f59e0b", label: "Amber" },
  ];

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Appearance"
        desc="Customise the visual language of your admin workspace."
      />

      {/* ── Theme ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
          Theme
        </p>
        <div className="flex gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleTheme(t.id)}
              className={`flex-1 flex flex-col items-center gap-2 py-4 text-sm font-semibold rounded-xl border-2 transition-all ${
                theme === t.id
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className={theme === t.id ? "text-brand-600" : "text-slate-400"}>
                {t.icon}
              </span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Live indicator */}
        <div className={`mt-3 flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all ${
          isDark
            ? "bg-slate-800 border-slate-700 text-slate-300"
            : "bg-slate-50 border-slate-200 text-slate-600"
        }`}>
          {isDark ? <Moon size={13} /> : <Sun size={13} />}
          <span className="text-xs font-semibold">
            Admin panel is currently in <strong>{isDark ? "dark" : "light"}</strong> mode.
            Changes apply immediately.
          </span>
        </div>
      </div>

      {/* ── Accent Color ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
          Accent Color
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          {accents.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAccentColor(a.id)}
              title={a.label}
              className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${
                accentColor === a.id ? "border-slate-900 scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: a.hex }}
            >
              {accentColor === a.id && (
                <Check size={14} className="text-white mx-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Density ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
          Display Density
        </p>
        <div className="flex gap-3">
          {(["comfortable", "compact"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDensity(d)}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl border-2 capitalize transition-all ${
                density === d
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Platform Tab ──────────────────────────────────────────────────────────────
function PlatformTab({ onSave }: { onSave: () => void }) {
  const [timezone, setTimezone] = useState("Asia/Dhaka");
  const [language, setLanguage] = useState("en-US");
  const [maxOrgs, setMaxOrgs] = useState("50");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(true);

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Platform Configuration"
        desc="Global settings that affect all users and organisations."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="settings-timezone" className="block text-xs font-semibold text-slate-600 mb-1.5">
            Timezone
          </label>
          <select
            id="settings-timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all font-semibold text-slate-700"
          >
            <option value="Asia/Dhaka">Asia/Dhaka (UTC+6)</option>
            <option value="America/New_York">America/New_York (UTC-5)</option>
            <option value="Europe/London">Europe/London (UTC+0)</option>
            <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
          </select>
        </div>
        <div>
          <label htmlFor="settings-language" className="block text-xs font-semibold text-slate-600 mb-1.5">
            Default Language
          </label>
          <select
            id="settings-language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all font-semibold text-slate-700"
          >
            <option value="en-US">English (US)</option>
            <option value="bn-BD">Bengali (BD)</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
          </select>
        </div>
        <InputField
          id="settings-max-orgs"
          label="Max Organisations"
          value={maxOrgs}
          onChange={setMaxOrgs}
          placeholder="e.g. 50"
        />
      </div>

      <div className="bg-slate-50/60 border border-slate-100 rounded-xl px-5 py-1">
        <ToggleRow
          id="settings-maintenance"
          label="Maintenance Mode"
          desc="Temporarily restrict all non-admin access to the platform."
          checked={maintenanceMode}
          onChange={setMaintenanceMode}
        />
        <ToggleRow
          id="settings-registration"
          label="Open Registration"
          desc="Allow new users to sign up without an admin invitation."
          checked={registrationOpen}
          onChange={setRegistrationOpen}
        />
      </div>

      <Button
        onClick={onSave}
        className="h-10 px-6 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg gap-2"
      >
        <Save size={14} />
        Save Platform Settings
      </Button>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [savedTab, setSavedTab] = useState<SettingsTab | null>(null);

  const handleSave = () => {
    setSavedTab(activeTab);
    setTimeout(() => setSavedTab(null), 2500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab onSave={handleSave} />;
      case "notifications":
        return <NotificationsTab />;
      case "security":
        return <SecurityTab onSave={handleSave} />;
      case "appearance":
        return <AppearanceTab />;
      case "platform":
        return <PlatformTab onSave={handleSave} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 pb-10"
    >
      {/* ── Header ── */}
      <PageHeader 
        title="Settings"
        subtitle="Manage your account, notifications, security, and platform-wide configuration."
      />

      {/* ── Layout ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Sidebar */}
        <motion.nav
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          className="w-full lg:w-60 flex-shrink-0"
        >
          <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden p-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all group ${
                  activeTab === tab.id
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span
                  className={`flex-shrink-0 ${
                    activeTab === tab.id ? "text-brand-600" : "text-slate-400 group-hover:text-slate-500"
                  }`}
                >
                  {tab.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-none truncate">
                    {tab.label}
                  </p>
                  <p className="text-[11px] font-normal text-slate-400 mt-0.5 truncate">
                    {tab.desc}
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  className={`flex-shrink-0 transition-opacity ${
                    activeTab === tab.id ? "opacity-100 text-brand-400" : "opacity-0"
                  }`}
                />
              </button>
            ))}
          </Card>
        </motion.nav>

        {/* Content area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 min-w-0"
        >
          <Card className="border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-slate-500">
                  {TABS.find((t) => t.id === activeTab)?.icon}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-slate-900 leading-tight">
                    {TABS.find((t) => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    {TABS.find((t) => t.id === activeTab)?.desc}
                  </p>
                </div>
              </div>
              {savedTab === activeTab && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 font-semibold">
                    <Check size={11} />
                    Saved
                  </Badge>
                </motion.div>
              )}
            </CardHeader>
            <CardContent className="p-6">{renderContent()}</CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}