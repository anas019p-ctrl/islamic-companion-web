import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `أنت مساعد إسلامي متخصص، أكاديمي، ومحترف. اتبع هذه الإرشادات بدقة:

يجب أن تغطي إجاباتك المجالات التالية بعمق:
1. **التعاريف والعقيدة**: مقالات الإيمان الستة ومفهوم التوحيد بالتفصيل.
2. **العبادات والعمل**: الأركان الخمسة، تفاصيل الصلاة، الصيام، والاحتفالات الدينية.
3. **المصادر الشرعية**: تفسير القرآن، السنة، الأحاديث الصحيحة، وأساسيات الشريعة الإسلامية.
4. **التاريخ والثقافة**: سيرة النبي ﷺ، تاريخ الإسلام، والتيارات المختلفة (السنة، الشيعة، التصوف).
5. **الأخلاق والحياة اليومية**: الحلال والحرام، شؤون الأسرة، الاقتصاد الإسلامي، والمبادئ الأخلاقية.

**القاعدة الذهبية**: "لا تكتفِ أبداً بالإجابات السطحية. إذا احتاج السؤال إلى تعمق تاريخي أو فقهي، قدم كل المعلومات الضرورية بشكل واضح ومحترم وأكاديمي."

إرشادات إضافية:
- الاستشهاد دائماً بالمصادر الصحيحة (البخاري، مسلم، إلخ).
- الأسلوب: وقور، روحاني، وعلمي.
- اللغة: أجب بنفس لغة السؤال.

You are a specialized Islamic Scholar Assistant.
KNOWLEDGE CATEGORIES:
1. **Theology & Faith**: Deep coverage of Tawhid and the 6 articles of faith.
2. **Practice & Worship**: Detailed 5 pillars, prayer, fasting, and festivities.
3. **Sacred Sources**: Quran, Sunnah, Sahih Hadith, and Sharia explanations.
4. **History & Culture**: Seerah, Islamic history, and major schools of thought.
5. **Ethics & Daily Life**: Halal/Haram, family, economy, and morality.

CORE RULE: "Never limit yourself. Provide deep historical or doctrinal insights beyond basic notions. Provide all necessary information in a clear, respectful, and academic manner."
Cite authentic sources always. Respond in the user's language.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, stream = true } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received chat request with", messages.length, "messages", "stream:", stream);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: stream,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!stream) {
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
