"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import { supabase } from "@/lib/supabase";

interface LinkSettingsContextType {
    getUrl: (key: string, fallback: string) => string;
    setUrl: (key: string, url: string) => Promise<void>;
    allSettings: Record<string, string>;
    loading: boolean;
    reload: () => Promise<void>;
}

const LinkSettingsContext = createContext<LinkSettingsContextType | undefined>(undefined);

export function LinkSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    const fetchSettings = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from("link_settings")
                .select("key, url");

            if (error) {
                console.error("Error fetching link settings:", error);
                setLoading(false);
                return;
            }

            if (data) {
                const map: Record<string, string> = {};
                data.forEach((row) => {
                    map[row.key] = row.url;
                });
                setSettings(map);
            }
        } catch (error) {
            console.error("Error fetching link settings:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const getUrl = useCallback(
        (key: string, fallback: string): string => {
            return settings[key] || fallback;
        },
        [settings]
    );

    const setUrl = useCallback(
        async (key: string, url: string) => {
            // Upsert: insert or update
            const { error } = await supabase
                .from("link_settings")
                .upsert(
                    { key, url, updated_at: new Date().toISOString() },
                    { onConflict: "key" }
                );

            if (error) {
                console.error("Error saving link setting:", error);
                throw error;
            }

            setSettings((prev) => ({ ...prev, [key]: url }));
        },
        []
    );

    return (
        <LinkSettingsContext.Provider
            value={{
                getUrl,
                setUrl,
                allSettings: settings,
                loading,
                reload: fetchSettings,
            }}
        >
            {children}
        </LinkSettingsContext.Provider>
    );
}

export function useLinkSettings() {
    const context = useContext(LinkSettingsContext);
    if (context === undefined) {
        throw new Error("useLinkSettings must be used within a LinkSettingsProvider");
    }
    return context;
}
