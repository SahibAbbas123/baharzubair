# Step-by-Step Guide to Register baharzubair.eu.org for $0 (Free)

`eu.org` has been providing 100% free domain names to individuals and non-profits since 1996. Unlike commercial registrars, it costs $0.00 forever.

---

### Step 1: Create an EU.org User Account
1. Open [https://nic.eu.org/](https://nic.eu.org/) in your web browser.
2. Click on **"Register user"** in the navigation menu (or go directly to [https://nic.eu.org/arf/en/contact/create/](https://nic.eu.org/arf/en/contact/create/)).
3. Fill out the simple contact form:
   - **Name:** Your name
   - **Email:** Your active email address
   - **Country:** Bangladesh (BD)
4. Submit the form. You will receive an automated email with your **Handle** (e.g., `AB123-FREE`) and a verification link. Click the link to set your password.

---

### Step 2: Request the Domain `baharzubair.eu.org`
1. Log in to [https://nic.eu.org/](https://nic.eu.org/) using your Handle and Password.
2. Click on **"New Domain"**.
3. In the **Complete domain name** field, type:
   ```
   baharzubair.eu.org
   ```
4. In the **Administrative contact** & **Technical contact**, choose **"contact handle is"** and enter your Handle.

---

### Step 3: DNS / Nameservers (Connecting to Free Cloudflare)
`eu.org` requires working DNS nameservers when submitting the request. The standard, best practice in 2026 is to use **Cloudflare's Free DNS**:
1. Log in to [https://dash.cloudflare.com/](https://dash.cloudflare.com/) (Free account).
2. Click **"Add a site"** and enter `baharzubair.eu.org` (Select the **Free Plan**).
3. Cloudflare will give you two free nameservers (for example: `ns1.cloudflare.com` and `ns2.cloudflare.com`).
4. Copy those two nameservers into the EU.org application form under **Nameservers**:
   - `Name1`: First Cloudflare nameserver
   - `Name2`: Second Cloudflare nameserver
5. Select **"server names"** (do not check IP unless requested).
6. Click **Submit**.

---

### Step 4: Approval & Live Activation
- `eu.org` requests are queued and processed automatically (often taking between a few hours to a few days).
- Once approved, Cloudflare turns active automatically with **free automatic SSL/HTTPS**.
- In Cloudflare DNS, add a `CNAME` record pointing to where your site is hosted (Vercel, Render, or a Cloudflare Tunnel), and `https://baharzubair.eu.org` will be live globally!
